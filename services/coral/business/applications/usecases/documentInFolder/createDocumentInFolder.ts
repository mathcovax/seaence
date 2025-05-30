import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentInFolderRepository } from "../../repositories/documentInFolder";
import { type DocumentTitle, DocumentInFolderEntity, type DocumentId } from "@business/domains/entities/documentInFolder";
import { ComputeDocumentQuantityInFolderrUsecase } from "../documentFolder/computeDocumentQuantityInFolder";
import { FindDocumentInFolderUsecase } from "./findDocumentInFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
	document: {
		id: DocumentId;
		title: DocumentTitle;
	};
}

export class CreateDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
	computeDocumentQuantityInFolderrUsecase: ComputeDocumentQuantityInFolderrUsecase,
	findDocumentInFolderUsecase: FindDocumentInFolderUsecase,
}) {
	public async execute({ documentFolder, document }: Input) {
		const existingDocumentInFolder = await this.findDocumentInFolderUsecase({
			folderId: documentFolder.id,
			documentId: document.id,
		});

		if (existingDocumentInFolder instanceof DocumentInFolderEntity) {
			return new UsecaseError("documentInFolder.alreadyExists");
		}

		const documentInFolder = DocumentInFolderEntity.create({
			...document,
			documentFolderId: documentFolder.id,
		});

		await this.documentInFolderRepository.save(documentInFolder);

		await this.computeDocumentQuantityInFolderrUsecase({
			documentFolder,
		});

		return documentInFolder;
	}
}

