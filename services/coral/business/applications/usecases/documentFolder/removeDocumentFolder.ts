import { UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentFolderRepository } from "../../repositories/documentFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
}

export class RemoveDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ documentFolder }: Input) {
		await this.documentFolderRepository.delete(documentFolder);
	}
}
