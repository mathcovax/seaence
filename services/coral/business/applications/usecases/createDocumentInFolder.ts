import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentInFolderRepository } from "../repositories/documentInFolder";
import { type DocumentInFolderTitle, type DocumentInFolderSummary, DocumentInFolderEntity, type DocumentId } from "@business/domains/entities/documentInFolder";
import { ComputeDocumentQuantityInFolderrUsecase } from "./computeDocumentQuantityInFolder";
import { FindDocumentInFolderUsecase } from "./findDocumentInFolder";

interface Input {
	folder: DocumentFolderEntity;
	document: {
		id: DocumentId;
		title: DocumentInFolderTitle;
		summary: DocumentInFolderSummary;
	};
}

export class CreateDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
	computeDocumentQuantityInFolderrUsecase: ComputeDocumentQuantityInFolderrUsecase,
	findDocumentInFolderUsecase: FindDocumentInFolderUsecase,
}) {
	public async execute({ folder, document }: Input) {
		const existingDocumentInFolder = await this.findDocumentInFolderUsecase({
			folderId: folder.id,
			documentId: document.id,
		});

		if (existingDocumentInFolder instanceof DocumentInFolderEntity) {
			return new UsecaseError("documentInFolder.alreadyExists");
		}

		const documentInFolder = DocumentInFolderEntity.create({
			...document,
			documentFolderId: folder.id,
		});

		await this.documentInFolderRepository.save(documentInFolder);

		await this.computeDocumentQuantityInFolderrUsecase({
			folder,
		});

		return documentInFolder;
	}
}

