import { C, pipe } from "@duplojs/utils";
import { DocumentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { DocumentInFolder } from "@business/domains/entities/documentInFolder";

interface Input {
	ownerDocumentInFolder: DocumentInFolder.Entity & DocumentInFolder.WithCheckedOwner;
	newDocumentInFolderName: DocumentInFolder.Name;
}

export const OwnerRenameDocumentInFolderUseCase = C.createUseCase(
	{ DocumentInFolderRepository },
	(
		{ documentInFolderRepository },
	) => (input: Input) => pipe(
		DocumentInFolder.rename(
			input.ownerDocumentInFolder,
			input.newDocumentInFolderName,
		),
		documentInFolderRepository.save,
	),
);
