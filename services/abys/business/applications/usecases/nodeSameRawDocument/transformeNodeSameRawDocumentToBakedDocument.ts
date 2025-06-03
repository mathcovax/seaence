import { BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { CookNodeSameRawDocumentUsecase } from "./cookNodeSameRawDocument";
import { UpsertBakedDocumentUsecase } from "../bakedDocument/upsertBakedDocument";
import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";

interface Input {
	nodeSameRawDocument: NodeSameRawDocumentEntity;
	bakedDocumentLanguages: BakedDocumentLanguage[];
}

export class TransformeNodeSameRawDocumentToBakedDocumentUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	cookNode: CookNodeSameRawDocumentUsecase,
	upsertBakedDocumentUsecase: UpsertBakedDocumentUsecase,
}) {
	public async execute({ nodeSameRawDocument, bakedDocumentLanguages }: Input) {
		const bakedDocuments = await Promise.all(
			bakedDocumentLanguages.map(
				(language) => this
					.cookNode({
						language,
						nodeSameRawDocument,
					})
					.then(
						async(cookedNode) => {
							if (cookedNode instanceof Error) {
								return cookedNode;
							}

							return this.upsertBakedDocumentUsecase(cookedNode);
						},
					),
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

		const transformationError = bakedDocuments.find(
			(bakedDocument) => bakedDocument instanceof Error,
		);

		if (transformationError) {
			return new UsecaseError(
				"error-during-transformation",
				{ error: transformationError },
			);
		}

		return bakedDocuments.filter(
			(bakedDocument): bakedDocument is BakedDocumentEntity => bakedDocument instanceof BakedDocumentEntity,
		);
	}
}
