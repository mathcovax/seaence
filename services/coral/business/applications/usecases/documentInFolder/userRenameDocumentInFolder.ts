import { UsecaseHandler } from "@vendors/clean";
import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { type UserDocumentInFolder } from "./userFindDocumentInFolderByUniqueCombination";
import { type DocumentInFolderName } from "@business/domains/entities/documentInFolder";

interface Input {
	userDocumentInFolder: UserDocumentInFolder;
	newDocumentInFolderName: DocumentInFolderName;
}

export class UserRenameDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ userDocumentInFolder, newDocumentInFolderName }: Input) {
		const updatedDocumentInFolder = userDocumentInFolder.value.rename(
			newDocumentInFolderName,
		);

		await this.documentInFolderRepository.save(updatedDocumentInFolder);

		return updatedDocumentInFolder;
	}
}
