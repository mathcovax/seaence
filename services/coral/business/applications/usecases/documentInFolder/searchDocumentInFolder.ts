import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { type DocumentInFolderName } from "@business/domains/entities/documentInFolder";
import { UsecaseHandler, type PositiveInt } from "@vendors/clean";
import { documentInFolderRepository } from "../../repositories/documentInFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
	documentInFolderName: DocumentInFolderName;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

export class SearchDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ documentFolder, documentInFolderName, quantityPerPage, page }: Input) {
		return this.documentInFolderRepository.findDocuments({
			documentFolder,
			documentInFolderName,
			quantityPerPage,
			page,
		});
	}
}
