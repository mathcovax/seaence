import { BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { CookNodeSameRawDocumentUsecase } from "./cookNodeSameRawDocument";
import { UpsertBakedDocumentUsecase } from "../bakedDocument/upsertBakedDocument";
import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";
import { type CookingMode } from "@business/domains/common/cookingMode";
import { match } from "ts-pattern";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";

interface Input {
	cookingMode: CookingMode;
	nodeSameRawDocument: NodeSameRawDocumentEntity;
	bakedDocumentLanguages: BakedDocumentLanguage[];
}

export class TransformeNodeSameRawDocumentToBakedDocumentUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	bakedDocumentRepository,
	cookNode: CookNodeSameRawDocumentUsecase,
	upsertBakedDocumentUsecase: UpsertBakedDocumentUsecase,
}) {
	public async execute({ nodeSameRawDocument, bakedDocumentLanguages, cookingMode }: Input) {
		const bakedDocuments = await Promise.all(
			bakedDocumentLanguages.map(
				async(bakedDocumentLanguage) => {
					const currentCookingMode = await match(cookingMode)
						.with(
							{ value: "default" },
							async(cookingMode) => {
								const bakedDocument = await this.bakedDocumentRepository.findOneById(
									BakedDocumentEntity.makeId({
										language: bakedDocumentLanguage,
										nodeSameRawDocumentId: nodeSameRawDocument.id,
									}),
								);

								return bakedDocument?.cookingMode ?? cookingMode;
							},
						)
						.otherwise((cookingMode) => cookingMode);

					const cookedNode = await this
						.cookNode({
							cookingMode: currentCookingMode,
							bakedDocumentLanguage,
							nodeSameRawDocument,
						});

					if (cookedNode instanceof Error) {
						return cookedNode;
					}

					return this.upsertBakedDocumentUsecase(cookedNode);
				},
			),
		);

		const updatedNodeSameRawDocument = bakedDocuments.reduce(
			(acc, bakedDocument) => {
				if (bakedDocument instanceof Error) {
					return acc;
				}

				return acc.cook(bakedDocument.language);
			},
			nodeSameRawDocument,
		);

		await this.nodeSameRawDocumentRepository.save(updatedNodeSameRawDocument);

		const transformationErrors = bakedDocuments.filter(
			(bakedDocument) => bakedDocument instanceof Error,
		);

		if (transformationErrors.length) {
			return new UsecaseError(
				"error-during-transformation",
				{ transformationErrors },
			);
		}

		return bakedDocuments.filter(
			(bakedDocument): bakedDocument is BakedDocumentEntity => bakedDocument instanceof BakedDocumentEntity,
		);
	}
}
