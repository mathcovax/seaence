import { UsecaseHandler } from "@vendors/clean";
import { documentInFolderRepository } from "../../repositories/documentInFolder";
import { type UserDocumentInFolder } from "./userFindDocumentInFolderByUniqueCombination";
import { ComputeDocumentQuantityInFolderUsecase } from "../documentFolder/computeDocumentQuantityInFolder";
import { documentFolderRepository } from "@business/applications/repositories/documentFolder";

interface Input {
	userDocumentInFolder: UserDocumentInFolder;
}

export class UserRemoveDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
	documentFolderRepository,
	computeDocumentQuantityInFolderUsecase: ComputeDocumentQuantityInFolderUsecase,
}) {
	public async execute({ userDocumentInFolder }: Input) {
		await this.documentInFolderRepository.delete(userDocumentInFolder.value);
		const documentFolder = await this.documentFolderRepository
			.getDocumentFolderByDocumentInFolder(
				userDocumentInFolder.value,
			);
		await this.computeDocumentQuantityInFolderUsecase({ documentFolder });
	}
}
