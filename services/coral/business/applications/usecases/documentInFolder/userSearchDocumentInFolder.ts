import { type Text, UsecaseHandler, type PositiveInt, type Int } from "@vendors/clean";
import { documentInFolderRepository } from "../../repositories/documentInFolder";
import { type UserDocumentFolder } from "../documentFolder/userFindDocumentFolderById";

interface Input {
	userDocumentFolder: UserDocumentFolder;
	partialDocumentInFolderName: Text;
	page: Int;
	quantityPerPage: PositiveInt;
}

export class UserSearchDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ userDocumentFolder, partialDocumentInFolderName, quantityPerPage, page }: Input) {
		return this.documentInFolderRepository.searchDocuments({
			documentFolder: userDocumentFolder.value,
			partialDocumentInFolderName,
			quantityPerPage,
			page,
		});
	}
}
