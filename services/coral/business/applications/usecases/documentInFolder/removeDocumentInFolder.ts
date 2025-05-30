import { UsecaseHandler } from "@vendors/clean";
import { type DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { documentInFolderRepository } from "../../repositories/documentInFolder";

interface Input {
	documentInFolder: DocumentInFolderEntity;
}

export class RemoveDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ documentInFolder }: Input) {
		await this.documentInFolderRepository.delete(documentInFolder);
	}
}
