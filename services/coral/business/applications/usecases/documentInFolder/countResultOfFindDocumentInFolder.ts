import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { type Text, UsecaseHandler } from "@vendors/clean";

interface Input {
	documentFolder: DocumentFolderEntity;
	partialDocumentInFolderName: Text;
}

export class CountResultOfFindDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ documentFolder, partialDocumentInFolderName }: Input) {
		return this.documentInFolderRepository.countResultOfFindDocumentInFolder(
			documentFolder,
			partialDocumentInFolderName,
		);
	}
}
