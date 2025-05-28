import { UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { documentInFolderRepository } from "../repositories/documentInFolder";
import { type DocumentId } from "@business/domains/entities/documentInFolder";

interface Input {
	folderId: DocumentFolderId;
	documentId: DocumentId;
}

export class FindDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ folderId, documentId }: Input) {
		return this.documentInFolderRepository
			.findDocumentInFolder(
				folderId,
				documentId,
			);
	}
}

