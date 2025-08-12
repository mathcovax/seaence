import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { type UserDocumentFolder } from "./userFindDocumentFolderById";
import { type DocumentFolderName } from "@business/domains/entities/documentFolder";

interface Input {
	userDocumentFolder: UserDocumentFolder;
	newDocumentFolderName: DocumentFolderName;
}

export class UserRenameDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ userDocumentFolder, newDocumentFolderName }: Input) {
		const findedDocumentFolder = await this.documentFolderRepository.findDocumentFolder(
			userDocumentFolder.value.userId,
			newDocumentFolderName,
		);

		if (findedDocumentFolder) {
			return new UsecaseError("document-folder-already-exist", { findedDocumentFolder });
		}

		const updatedDocumentFolder = userDocumentFolder.value.rename(newDocumentFolderName);

		return this.documentFolderRepository.save(updatedDocumentFolder);
	}
}
