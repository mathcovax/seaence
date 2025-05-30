import { UsecaseHandler } from "@vendors/clean";
import { type DocumentTitle, type DocumentId } from "@business/domains/entities/documentInFolder";
import { documentInFolderRepository } from "../../repositories/documentInFolder";

interface Input {
	documentId: DocumentId;
	newTitle: DocumentTitle;
}

export class RenameDocumentInFoldersUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ documentId, newTitle }: Input) {
		const documentInFolderGenerator = this.documentInFolderRepository.streamByDocumentId(documentId);

		let count = 0;

		for await (const documentInFolder of documentInFolderGenerator) {
			documentInFolder.renameDocumentInFolder(newTitle);
			await this.documentInFolderRepository.save(documentInFolder);
			count++;
		}

		return count;
	}
}
