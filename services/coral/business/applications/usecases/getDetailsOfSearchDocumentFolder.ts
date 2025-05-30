import { UsecaseHandler } from "@vendors/clean";
import { type UserId } from "@business/domains/common/user";
import { documentFolderRepository } from "../repositories/documentFolder";
import { type DocumentFolderTitle } from "@business/domains/entities/documentFolder";

interface Input {
	userId: UserId;
	documentFolderTitle: DocumentFolderTitle;
}

export class GetDetailsOfSearchDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public execute({ userId, documentFolderTitle }: Input) {
		return this.documentFolderRepository.getDetailsSearchDocumentFolder({
			userId,
			documentFolderTitle,
		});
	}
}
