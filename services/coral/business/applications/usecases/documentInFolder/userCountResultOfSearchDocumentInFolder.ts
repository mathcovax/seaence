import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { type Text, UsecaseHandler } from "@vendors/clean";
import { type UserDocumentFolder, UserFindDocumentFolderByIdUsecase } from "../documentFolder/userFindDocumentFolderById";

interface Input {
	userDocumentFolder: UserDocumentFolder;
	partialDocumentInFolderName: Text;
}

export class UserCountResultOfSearchDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
	userFindDocumentFolderByIdUsecase: UserFindDocumentFolderByIdUsecase,
}) {
	public async execute({ userDocumentFolder, partialDocumentInFolderName }: Input) {
		return this.documentInFolderRepository.countResultOfSearchDocumentInFolder(
			userDocumentFolder.value,
			partialDocumentInFolderName,
		);
	}
}
