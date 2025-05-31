import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { DocumentFolderEntity, type DocumentFolderName } from "@business/domains/entities/documentFolder";
import { type UserId } from "@business/domains/common/user";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { FindDocumentFolderUsecase } from "./findDocumentFolder";

interface Input {
	documentFolderName: DocumentFolderName;
	userId: UserId;
}

export class CreateDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
	findDocumentFolderUsecase: FindDocumentFolderUsecase,
}) {
	public async execute({ documentFolderName, userId }: Input) {
		const findedDocumentFolder = await this.findDocumentFolderUsecase({
			documentFolderName,
			userId,
		});

		if (findedDocumentFolder) {
			return new UsecaseError("document-folder-already-exist", { findedDocumentFolder });
		}

		const documentFolder = DocumentFolderEntity.create({
			id: this.documentFolderRepository.generateDocumentFolderId(),
			userId,
			name: documentFolderName,
		});

		await this.documentFolderRepository.save(documentFolder);

		return documentFolder;
	}
}
