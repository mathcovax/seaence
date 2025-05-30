import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { type DocumentTitle } from "@business/domains/entities/documentInFolder";
import { UsecaseHandler } from "@vendors/clean";
import { documentInFolderRepository } from "../repositories/documentInFolder";

interface Input {
	documentFolder: DocumentFolderEntity;
	documentTitle: DocumentTitle;
}

export class GetDetailsSearchDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ documentFolder, documentTitle }: Input) {
		return this.documentInFolderRepository.getDetailsOfSearchDocumentInFolder({
			documentFolder,
			documentTitle,
		});
	}
}
