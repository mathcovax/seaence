import { UsecaseHandler } from "@vendors/clean";
import { type DocumentTitle, type DocumentId, type DocumentSummary } from "@business/domains/entities/documentInFolder";
import { documentInFolderRepository } from "../repositories/documentInFolder";

interface Input {
	documentId: DocumentId;
	title: DocumentTitle;
	summary: DocumentSummary;
}

export class UpdateDocumentInFoldersUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ documentId, title, summary }: Input) {
		// todo
	}
}
