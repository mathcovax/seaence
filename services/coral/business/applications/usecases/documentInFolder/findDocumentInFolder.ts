import { UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { documentInFolderRepository } from "../../repositories/documentInFolder";
import { type NodeSameRawDocumentId } from "@business/domains/entities/documentInFolder";

interface Input {
	folderId: DocumentFolderId;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
}

export class FindDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ folderId, nodeSameRawDocumentId }: Input) {
		return this.documentInFolderRepository
			.findDocumentInFolder(
				folderId,
				nodeSameRawDocumentId,
			);
	}
}
