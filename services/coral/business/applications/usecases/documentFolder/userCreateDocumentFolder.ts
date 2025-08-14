import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { DocumentFolderEntity, type DocumentFolderName } from "@business/domains/entities/documentFolder";
import { type UserId } from "@business/domains/common/user";
import { documentFolderRepository } from "../../repositories/documentFolder";
import { UserCountResultOfSearchDocumentFolderUsecase } from "./userCountResultOfSearchDocumentFolder";

interface Input {
	documentFolderName: DocumentFolderName;
	userId: UserId;
}

const maxDocumentFolderQuantity = 50;

export class UserCreateDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
	countTotalDocumentFolderUsecase: UserCountResultOfSearchDocumentFolderUsecase,
}) {
	public async execute({ documentFolderName, userId }: Input) {
		const findedDocumentFolder = await this.documentFolderRepository.findDocumentFolder(userId, documentFolderName);

		if (findedDocumentFolder) {
			return new UsecaseError("document-folder-already-exist", { findedDocumentFolder });
		}

		const total = await this.countTotalDocumentFolderUsecase({
			userId,
			partialDocumentFolderName: null,
		});

		if (total.value >= maxDocumentFolderQuantity) {
			return new UsecaseError("document-folder-max-quantity", { total });
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
