import { type UserId } from "@business/domains/common/user";
import { type DocumentFolderId, type DocumentFolderEntity, type DocumentFolderTitle } from "@business/domains/entities/documentFolder";
import { createRepositoryHandler, type PositiveInt, type Int, type RepositoryBase } from "@vendors/clean";

interface InputFindDocumentFolders {
	userId: UserId;
	documentFolderTitle: DocumentFolderTitle;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

interface InputCountResultOfFindDocumentFolder {
	userId: UserId;
	documentFolderTitle: DocumentFolderTitle;
}

export interface DocumentFolderRepository extends RepositoryBase<DocumentFolderEntity> {
	generateDocumentFolderId(): DocumentFolderId;
	delete(folder: DocumentFolderEntity): Promise<void>;
	countDocumentsInFolder(folder: DocumentFolderEntity): Promise<Int>;
	findDocumentFolderById(documentFolderId: DocumentFolderId): Promise<DocumentFolderEntity | null>;
	findDocumentFolders(
		input: InputFindDocumentFolders,
	): Promise<DocumentFolderEntity[]>;
	countResultOfFindDocumentFolder(
		input: InputCountResultOfFindDocumentFolder,
	): Promise<Int>;
}

export const documentFolderRepository = createRepositoryHandler<DocumentFolderRepository>();
