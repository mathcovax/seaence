import { type UserId } from "@business/domains/common/user";
import { type DocumentFolderId, type DocumentFolderEntity, type DocumentFolderName } from "@business/domains/entities/documentFolder";
import { createRepositoryHandler, type PositiveInt, type Int, type RepositoryBase, type Text } from "@vendors/clean";

interface InputFindDocumentFolders {
	userId: UserId;
	partialDocumentFolderName: Text;
	page: Int;
	quantityPerPage: PositiveInt;
}

export interface DocumentFolderRepository extends RepositoryBase<DocumentFolderEntity> {
	generateDocumentFolderId(): DocumentFolderId;
	delete(folder: DocumentFolderEntity): Promise<void>;
	countDocumentsInFolder(folder: DocumentFolderEntity): Promise<Int>;
	findDocumentFolderById(documentFolderId: DocumentFolderId): Promise<DocumentFolderEntity | null>;
	findDocumentFolder(
		userId: UserId,
		documentFolderName: DocumentFolderName,
	): Promise<DocumentFolderEntity | null>;
	searchDocumentFolders(
		input: InputFindDocumentFolders,
	): Promise<DocumentFolderEntity[]>;
	countResultOfSearchDocumentFolder(
		userId: UserId,
		partialDocumentFolderName: Text | null,
	): Promise<Int>;
}

export const documentFolderRepository = createRepositoryHandler<DocumentFolderRepository>();
