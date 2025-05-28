import { UsecaseHandler } from "@vendors/clean";
import { DocumentFolderEntity, type DocumentFolderTitle } from "@business/domains/entities/documentFolder";
import { type UserId } from "@business/domains/common/user";
import { documentFolderRepository } from "../repositories/documentFolder";

interface Input {
	title: DocumentFolderTitle;
	userId: UserId;
}

export class CreateDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ title, userId }: Input) {
		const documentFolder = DocumentFolderEntity.create({
			id: this.documentFolderRepository.generateDocumentFolderId(),
			userId,
			title,
		});
		await this.documentFolderRepository.save(documentFolder);

		return documentFolder;
	}
}
