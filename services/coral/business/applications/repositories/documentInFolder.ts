import { type DocumentFolderEntity, type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { type NodeSameRawDocumentId, type DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { createRepositoryHandler, type Text, type Int, type PositiveInt, type RepositoryBase } from "@vendors/clean";

interface InputFindDocuments {
	documentFolder: DocumentFolderEntity;
	partialDocumentInFolderName: Text;
	quantityPerPage: PositiveInt;
	page: PositiveInt;
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
		documentFolder: DocumentFolderEntity,
		partialDocumentInFolderName: Text,
	): Promise<Int>;
}

export const documentInFolderRepository = createRepositoryHandler<DocumentInFolderRepository>();
