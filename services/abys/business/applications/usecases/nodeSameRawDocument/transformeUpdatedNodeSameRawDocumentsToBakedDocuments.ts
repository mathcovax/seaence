import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { TransformeNodeSameRawDocumentToBakedDocumentUsecase } from "./transformeNodeSameRawDocumentToBakedDocument";
import { bakedDocumentLanguageEnum, bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { type CookingMode } from "@business/domains/common/cookingMode";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { match } from "ts-pattern";

interface Input {
	cookingMode: CookingMode;
}

const bakedDocumentLanguages = bakedDocumentLanguageEnum
	.toTuple()
	.map(
		(language) => bakedDocumentLanguageObjecter.unsafeCreate(language),
	);

export class TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	bakedDocumentRepository,
	transformeNode: TransformeNodeSameRawDocumentToBakedDocumentUsecase,
}) {
	public async execute({ cookingMode }: Input) {
		for await (const nodeSameRawDocument of this.nodeSameRawDocumentRepository.findUpdatedNode()) {
			const results = await Promise.all(
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

						return this.transformeNode({
							bakedDocumentLanguage,
							nodeSameRawDocument,
							cookingMode: currentCookingMode,
						});
					},
				),
			);

			const errors = results.filter((result) => result instanceof Error);

			if (errors.length) {
				return new UsecaseError("error-during-node-transformation", { errors });
			}
		}
	}
}
