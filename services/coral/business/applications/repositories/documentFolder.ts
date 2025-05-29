import { type DocumentFolderId, type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

export interface DocumentFolderRepository extends RepositoryBase<DocumentFolderEntity> {
	generateDocumentFolderId(): DocumentFolderId;
	delete(folder: DocumentFolderEntity): Promise<void>;
	countDocumentsInFolder(folder: DocumentFolderEntity): Promise<Int>;
	findDocumentFolderById(documentFolderId: DocumentFolderId): Promise<DocumentFolderEntity | null>;
}

export const documentFolderRepository = createRepositoryHandler<DocumentFolderRepository>();
