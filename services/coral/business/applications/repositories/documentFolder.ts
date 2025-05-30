import { type UserId } from "@business/domains/common/user";
import { type DocumentFolderId, type DocumentFolderEntity, type DocumentFolderTitle } from "@business/domains/entities/documentFolder";
import { createRepositoryHandler, type PositiveInt, type Int, type RepositoryBase } from "@vendors/clean";

interface InputSearchDocumentFolderPerPageWhereTitleIs {
	userId: UserId;
	documentFolderTitle: DocumentFolderTitle;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

interface OutputSearchDocumentFolderPerPageWhereTitleIs {
	documentFolders: DocumentFolderEntity[];
	numberOfDocumentFolder: Int;
}

export interface DocumentFolderRepository extends RepositoryBase<DocumentFolderEntity> {
	generateDocumentFolderId(): DocumentFolderId;
	delete(folder: DocumentFolderEntity): Promise<void>;
	countDocumentsInFolder(folder: DocumentFolderEntity): Promise<Int>;
	findDocumentFolderById(documentFolderId: DocumentFolderId): Promise<DocumentFolderEntity | null>;
	searchDocumentFolderPerPageWhereTitleIs(
		input: InputSearchDocumentFolderPerPageWhereTitleIs
	): Promise<OutputSearchDocumentFolderPerPageWhereTitleIs>;
}

export const documentFolderRepository = createRepositoryHandler<DocumentFolderRepository>();
