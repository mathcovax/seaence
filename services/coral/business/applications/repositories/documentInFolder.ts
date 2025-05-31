import { type DocumentFolderEntity, type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { type NodeSameRawDocumentId, type DocumentInFolderEntity, type DocumentInFolderName } from "@business/domains/entities/documentInFolder";
import { createRepositoryHandler, type Int, type PositiveInt, type RepositoryBase } from "@vendors/clean";

interface InputFindDocuments {
	documentFolder: DocumentFolderEntity;
	documentInFolderName: DocumentInFolderName;
	quantityPerPage: PositiveInt;
	page: PositiveInt;
}

interface InputCountResultOfFindDocumentInFolder {
	documentFolder: DocumentFolderEntity;
	documentInFolderName: DocumentInFolderName;
}

export interface DocumentInFolderRepository extends RepositoryBase<DocumentInFolderEntity> {
	delete(document: DocumentInFolderEntity): Promise<void>;
	findDocumentInFolder(
		documentFolderId: DocumentFolderId,
		nodeSameRawDocumentId: NodeSameRawDocumentId,
	): Promise<DocumentInFolderEntity | null>;
	findDocuments(
		input: InputFindDocuments,
	): Promise<DocumentInFolderEntity[]>;
	countResultOfFindDocumentInFolder(
		input: InputCountResultOfFindDocumentInFolder,
	): Promise<Int>;
}

export const documentInFolderRepository = createRepositoryHandler<DocumentInFolderRepository>();
