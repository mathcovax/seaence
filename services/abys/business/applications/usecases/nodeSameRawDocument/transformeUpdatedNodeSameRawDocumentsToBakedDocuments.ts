import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { UsecaseHandler } from "@vendors/clean";
import { TransformeNodeSameRawDocumentToBakedDocumentUsecase } from "./transformeNodeSameRawDocumentToBakedDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";
import { type CookingMode } from "@business/domains/common/cookingMode";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { match } from "ts-pattern";

interface Input {
	bakedDocumentLanguages: BakedDocumentLanguage[];
	cookingMode: CookingMode;
}

export class TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	bakedDocumentRepository,
	transformeNode: TransformeNodeSameRawDocumentToBakedDocumentUsecase,
}) {
	public async execute({ bakedDocumentLanguages, cookingMode }: Input) {
		for await (const nodeSameRawDocument of this.nodeSameRawDocumentRepository.findUpdatedNode()) {
			const result = await Promise.all(
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

			if (result instanceof Error) {
				return result;
			}
		}
	}
}
