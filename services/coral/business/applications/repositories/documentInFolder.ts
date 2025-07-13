import { type UserId } from "@business/domains/common/user";
import { type DocumentFolderEntity, type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { type NodeSameRawDocumentId, type DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { createRepositoryHandler, type Text, type Int, type PositiveInt, type RepositoryBase } from "@vendors/clean";

interface InputFindDocuments {
	documentFolder: DocumentFolderEntity;
	partialDocumentInFolderName: Text;
	quantityPerPage: PositiveInt;
	page: Int;
}

export interface DocumentInFolderRepository extends RepositoryBase<DocumentInFolderEntity> {
	delete(documentInFolderEntity: DocumentInFolderEntity): Promise<void>;
	findDocumentInFolder(
		documentFolderId: DocumentFolderId,
		nodeSameRawDocumentId: NodeSameRawDocumentId,
	): Promise<DocumentInFolderEntity | null>;
	searchDocuments(
		input: InputFindDocuments,
	): Promise<DocumentInFolderEntity[]>;
	countResultOfSearchDocumentInFolder(
		documentFolder: DocumentFolderEntity,
		partialDocumentInFolderName: Text | null,
	): Promise<Int>;
	nodeSameRawDocumentIdsHaveDocumentInFolder(
		userId: UserId,
		nodeSameRawDocumentIds: NodeSameRawDocumentId[]
	): Promise<NodeSameRawDocumentId[]>;
	deleteAllByUserId(userId: UserId): Promise<void>;
}

export const documentInFolderRepository = createRepositoryHandler<DocumentInFolderRepository>();
