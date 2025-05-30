import { type DocumentFolderEntity, type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { type DocumentTitle, type DocumentId, type DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { createRepositoryHandler, type Int, type PositiveInt, type RepositoryBase } from "@vendors/clean";

interface InputSearchDocumentInFolderPerPageWhereTitleIs {
	documentFolder: DocumentFolderEntity;
	documentTitle: DocumentTitle;
	quantityPerPage: PositiveInt;
	page: PositiveInt;
}

interface OutputSearchDocumentInFolderPerPageWhereTitleIs {
	documentsInFolder: DocumentInFolderEntity[];
	numberOfDocumentInFolder: Int;
}

export interface DocumentInFolderRepository extends RepositoryBase<DocumentInFolderEntity> {
	delete(document: DocumentInFolderEntity): Promise<void>;
	findDocumentInFolder(
		documentFolderId: DocumentFolderId,
		documentId: DocumentId,
	): Promise<DocumentInFolderEntity | null>;
	searchDocumentInFolderPerPageWhereTitleIs(
		input: InputSearchDocumentInFolderPerPageWhereTitleIs
	): Promise<OutputSearchDocumentInFolderPerPageWhereTitleIs>;
}

export const documentInFolderRepository = createRepositoryHandler<DocumentInFolderRepository>();
