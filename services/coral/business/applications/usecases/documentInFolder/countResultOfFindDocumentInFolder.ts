import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { type DocumentInFolderName } from "@business/domains/entities/documentInFolder";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	documentFolder: DocumentFolderEntity;
	documentInFolderName: DocumentInFolderName;
}

export class CountResultOfFindDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ documentFolder, documentInFolderName }: Input) {
		return this.documentInFolderRepository.countResultOfFindDocumentInFolder({
			documentFolder,
			documentInFolderName,
		});
	}
}
