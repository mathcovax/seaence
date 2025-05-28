import { UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentFolderRepository } from "../repositories/documentFolder";

interface Input {
	folder: DocumentFolderEntity;
}

export class ComputeDocumentQuantityInFolderrUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ folder }: Input) {
		const documentinFolderQuantity = await this.documentFolderRepository.countDocumentsInFolder(folder);

		const documentInFolder = folder.updateDocumentInFolderQuantity(documentinFolderQuantity);

		await this.documentFolderRepository.save(documentInFolder);
	}
}
