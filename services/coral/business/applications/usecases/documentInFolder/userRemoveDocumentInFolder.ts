import { UsecaseHandler } from "@vendors/clean";
import { documentInFolderRepository } from "../../repositories/documentInFolder";
import { type UserDocumentInFolder } from "./userFindDocumentInFolderByUniqueCombination";

interface Input {
	userDocumentInFolder: UserDocumentInFolder;
}

export class UserRemoveDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ userDocumentInFolder }: Input) {
		await this.documentInFolderRepository.delete(userDocumentInFolder.value);
	}
}
