import { UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentFolderRepository } from "../repositories/documentFolder";

interface Input {
	folder: DocumentFolderEntity;
}

export class DeleteDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ folder }: Input) {
		await this.documentFolderRepository.delete(folder);
	}
}
