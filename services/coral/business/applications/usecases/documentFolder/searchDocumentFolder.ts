import { type DocumentFolderTitle } from "@business/domains/entities/documentFolder";
import { UsecaseHandler, type PositiveInt } from "@vendors/clean";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	documentFolderTitle: DocumentFolderTitle;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

export class SearchDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public execute({ userId, documentFolderTitle, quantityPerPage, page }: Input) {
		return this.documentFolderRepository.findDocumentFolders({
			documentFolderTitle,
			quantityPerPage,
			page,
			userId,
		});
	}
}
