import { UsecaseHandler } from "@vendors/clean";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { type DocumentFolderName } from "@business/domains/entities/documentFolder";
import { type UserId } from "@business/domains/common/user";

interface Input {
	documentFolderName: DocumentFolderName;
	userId: UserId;
}

export class FindDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ documentFolderName, userId }: Input) {
		return this.documentFolderRepository.findDocumentFolder(userId, documentFolderName);
	}
}
