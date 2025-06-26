import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { UsecaseHandler } from "@vendors/clean";
import { TransformeNodeSameRawDocumentToBakedDocumentUsecase } from "./transformeNodeSameRawDocumentToBakedDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";
import { type CookingMode } from "@business/domains/common/cookingMode";

interface Input {
	bakedDocumentLanguages: BakedDocumentLanguage[];
	cookingMode: CookingMode;
}

export class TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	transformeNode: TransformeNodeSameRawDocumentToBakedDocumentUsecase,
}) {
	public async execute({ bakedDocumentLanguages, cookingMode }: Input) {
		for await (const nodeSameRawDocument of this.nodeSameRawDocumentRepository.findUpdatedNode()) {
			const result = await this.transformeNode({
				bakedDocumentLanguages,
				nodeSameRawDocument,
				cookingMode,
			});

			if (result instanceof Error) {
				return result;
			}
		}
	}
}
