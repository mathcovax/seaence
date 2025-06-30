import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { UsecaseHandler } from "@vendors/clean";
import { CookNodeSameRawDocumentUsecase } from "./cookNodeSameRawDocument";
import { UpsertBakedDocumentUsecase } from "../bakedDocument/upsertBakedDocument";
import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";
import { type CookingMode } from "@business/domains/common/cookingMode";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";

interface Input {
	cookingMode: CookingMode;
	nodeSameRawDocument: NodeSameRawDocumentEntity;
	bakedDocumentLanguage: BakedDocumentLanguage;
}

export class TransformeNodeSameRawDocumentToBakedDocumentUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	bakedDocumentRepository,
	cookNode: CookNodeSameRawDocumentUsecase,
	upsertBakedDocumentUsecase: UpsertBakedDocumentUsecase,
}) {
	public async execute({ nodeSameRawDocument, bakedDocumentLanguage, cookingMode }: Input) {
		const cookedNode = await this
			.cookNode({
				cookingMode,
				bakedDocumentLanguage,
				nodeSameRawDocument,
			});

		if (cookedNode instanceof Error) {
			return cookedNode;
		}

		const bakedDocument = await this.upsertBakedDocumentUsecase(cookedNode);

		const updatedNodeSameRawDocument = nodeSameRawDocument.cook(bakedDocumentLanguage);

		await this.nodeSameRawDocumentRepository.save(updatedNodeSameRawDocument);

		return bakedDocument;
	}
}
