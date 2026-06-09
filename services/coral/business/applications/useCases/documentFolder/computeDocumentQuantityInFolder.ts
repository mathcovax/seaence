import { asyncPipe, C } from "@duplojs/utils";
import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";
import { DocumentFolder } from "@business/domains/entities/documentFolder";

interface Input {
	documentFolder: DocumentFolder.Entity;
}

export const ComputeDocumentQuantityInFolderUseCase = C.createUseCase(
	{ DocumentFolderRepository },
	(
		{ documentFolderRepository },
	) => (input: Input) => asyncPipe(
		documentFolderRepository.countDocumentInFolder(
			input.documentFolder,
		),
		DocumentFolder.NumberOfDocument.createOrThrow,
		(countOfDocumentInFolder) => DocumentFolder.updateDocumentInFolderQuantity(
			input.documentFolder,
			countOfDocumentInFolder,
		),
		documentFolderRepository.save,
	),
);
