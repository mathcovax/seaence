import { UsecaseHandler } from "@vendors/clean";
import { TransformeNodeSameRawDocumentToBakedDocumentUsecase } from "./nodeSameRawDocument/transformeNodeSameRawDocumentToBakedDocument";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { type CookingMode } from "@business/domains/common/cookingMode";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";
import { IndexBakedDocumentUsecase } from "./bakedDocument/indexBakedDocument";

interface Input {
	cookingMode: CookingMode;
	nodeSameRawDocument: NodeSameRawDocumentEntity;
	bakedDocumentLanguage: BakedDocumentLanguage;
}

export class TransformeNodeSameRawDocumentAndReindexBakedDocumentUsecase extends UsecaseHandler.create({
	transformNode: TransformeNodeSameRawDocumentToBakedDocumentUsecase,
	indexation: IndexBakedDocumentUsecase,
}) {
	public async execute(
		{
			cookingMode,
			nodeSameRawDocument,
			bakedDocumentLanguage,
		}: Input,
	) {
		const bakedDocument = await this
			.transformNode({
				cookingMode,
				nodeSameRawDocument,
				bakedDocumentLanguage,
			});

		if (bakedDocument instanceof Error) {
			return bakedDocument;
		}

		await this.indexation({ bakedDocument });

		return bakedDocument;
	}
}
