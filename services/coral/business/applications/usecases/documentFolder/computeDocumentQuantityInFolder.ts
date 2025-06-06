import { UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentFolderRepository } from "../../repositories/documentFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
}

export class ComputeDocumentQuantityInFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ documentFolder }: Input) {
		const documentinFolderQuantity = await this.documentFolderRepository.countDocumentsInFolder(documentFolder);

		const updatedDocumentFolder = documentFolder.updateDocumentInFolderQuantity(documentinFolderQuantity);

		await this.documentFolderRepository.save(updatedDocumentFolder);
	}
}
