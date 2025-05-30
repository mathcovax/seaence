import { UsecaseHandler } from "@vendors/clean";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { type DocumentFolderId } from "@business/domains/entities/documentFolder";

interface Input {
	documentFolderId: DocumentFolderId;
}

export class FindDocumentFolderByIdUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ documentFolderId }: Input) {
		return this.documentFolderRepository.findDocumentFolderById(documentFolderId);
	}
}
