import { UsecaseHandler } from "@vendors/clean";
import { type DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { documentInFolderRepository } from "../repositories/documentInFolder";

interface Input {
	document: DocumentInFolderEntity;
}

export class DropDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ document }: Input) {
		await this.documentInFolderRepository.delete(document);
	}
}
