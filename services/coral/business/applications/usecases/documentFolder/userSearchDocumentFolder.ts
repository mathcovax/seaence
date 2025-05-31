import { type Text, UsecaseHandler, type PositiveInt, type Int } from "@vendors/clean";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialDocumentFolderName: Text;
	page: Int;
	quantityPerPage: PositiveInt;
}

export class UserSearchDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public execute({ userId, partialDocumentFolderName, quantityPerPage, page }: Input) {
		return this.documentFolderRepository.searchDocumentFolders({
			partialDocumentFolderName,
			quantityPerPage,
			page,
			userId,
		});
	}
}
