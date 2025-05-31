import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentInFolderRepository } from "../../repositories/documentInFolder";
import { DocumentInFolderEntity, type NodeSameRawDocumentId, type DocumentInFolderName } from "@business/domains/entities/documentInFolder";
import { ComputeDocumentQuantityInFolderUsecase } from "../documentFolder/computeDocumentQuantityInFolder";
import { FindDocumentInFolderUsecase } from "./findDocumentInFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
	document: {
		nodeSameRawDocumentId: NodeSameRawDocumentId;
		name: DocumentInFolderName;
	};
}

export class CreateDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
	computeDocumentQuantityInFolderrUsecase: ComputeDocumentQuantityInFolderUsecase,
	findDocumentInFolderUsecase: FindDocumentInFolderUsecase,
}) {
	public async execute({ documentFolder, document }: Input) {
		const findedDocumentInFolder = await this.findDocumentInFolderUsecase({
			folderId: documentFolder.id,
			nodeSameRawDocumentId: document.nodeSameRawDocumentId,
		});

		if (findedDocumentInFolder) {
			return new UsecaseError("document-in-folder-already-exists", { findedDocumentInFolder });
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

