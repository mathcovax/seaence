import { UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentFolderRepository } from "../repositories/documentFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
}

export class ComputeDocumentQuantityInFolderrUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ documentFolder }: Input) {
		const documentinFolderQuantity = await this.documentFolderRepository.countDocumentsInFolder(documentFolder);

		const documentInFolder = documentFolder.updateDocumentInFolderQuantity(documentinFolderQuantity);

		await this.documentFolderRepository.save(documentInFolder);
	}
}
