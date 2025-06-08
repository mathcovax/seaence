import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { UsecaseHandler } from "@vendors/clean";
import { TransformeNodeSameRawDocumentToBakedDocumentUsecase } from "./transformeNodeSameRawDocumentToBakedDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";

interface Input {
	bakedDocumentLanguages: BakedDocumentLanguage[];
}

export class TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	transformeNode: TransformeNodeSameRawDocumentToBakedDocumentUsecase,
}) {
	public async execute({ bakedDocumentLanguages }: Input) {
		for await (const nodeSameRawDocument of this.nodeSameRawDocumentRepository.findUpdatedNode()) {
			const result = await this.transformeNode({
				bakedDocumentLanguages,
				nodeSameRawDocument,
			});

			if (result instanceof Error) {
				return result;
			}
		}
	}
}
