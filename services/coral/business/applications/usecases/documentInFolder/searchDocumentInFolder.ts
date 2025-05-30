import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { type DocumentTitle } from "@business/domains/entities/documentInFolder";
import { UsecaseHandler, type PositiveInt } from "@vendors/clean";
import { documentInFolderRepository } from "../../repositories/documentInFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
	documentTitle: DocumentTitle;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

export class SearchDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ documentFolder, documentTitle, quantityPerPage, page }: Input) {
		return this.documentInFolderRepository.searchDocumentInFolderPerPageWhereTitleIs({
			documentFolder,
			documentTitle,
			quantityPerPage,
			page,
		});
	}
}
