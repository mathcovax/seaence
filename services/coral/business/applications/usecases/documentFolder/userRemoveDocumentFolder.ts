import { UsecaseHandler } from "@vendors/clean";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { type UserDocumentFolder } from "./userFindDocumentFolderById";

interface Input {
	userDocumentFolder: UserDocumentFolder;
}

export class UserRemoveDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ userDocumentFolder }: Input) {
		await this.documentFolderRepository.delete(userDocumentFolder.value);
	}
}
