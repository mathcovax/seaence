import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { type Text, UsecaseHandler, type PositiveInt } from "@vendors/clean";
import { documentInFolderRepository } from "../../repositories/documentInFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
	partialDocumentInFolderName: Text;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

export class SearchDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ documentFolder, partialDocumentInFolderName, quantityPerPage, page }: Input) {
		return this.documentInFolderRepository.findDocuments({
			documentFolder,
			partialDocumentInFolderName,
			quantityPerPage,
			page,
		});
	}
}
