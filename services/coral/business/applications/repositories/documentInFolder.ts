import { type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { type DocumentId, type DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface DocumentInFolderRepository extends RepositoryBase<DocumentInFolderEntity> {
	delete(document: DocumentInFolderEntity): Promise<void>;
	findDocumentInFolder(
		documentFolderId: DocumentFolderId,
		documentId: DocumentId,
	): Promise<DocumentInFolderEntity | null>;
}

export const documentInFolderRepository = createRepositoryHandler<DocumentInFolderRepository>();
