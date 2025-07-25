import { UsecaseHandler } from "@vendors/clean";
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
		const updatedDocumentFolder = userDocumentFolder.value.update({
			name: newDocumentFolderName,
		});

		await this.documentFolderRepository.save(updatedDocumentFolder);

		return updatedDocumentFolder;
	}
}
