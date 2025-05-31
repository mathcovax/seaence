import { type Text, UsecaseHandler, type PositiveInt } from "@vendors/clean";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialDocumentFolderName: Text;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

export class SearchDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public execute({ userId, partialDocumentFolderName, quantityPerPage, page }: Input) {
		return this.documentFolderRepository.findDocumentFolders({
			partialDocumentFolderName,
			quantityPerPage,
			page,
			userId,
		});
	}
}
