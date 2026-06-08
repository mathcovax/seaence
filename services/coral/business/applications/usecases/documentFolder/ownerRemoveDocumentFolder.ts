import { C } from "@duplojs/utils";
import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";
import type { DocumentFolder } from "@business/domains/entities/documentFolder";

interface Input {
	ownerDocumentFolder: DocumentFolder.Entity & DocumentFolder.WithCheckedOwner;
}

export const OwnerRemoveDocumentFolderUseCase = C.createUseCase(
	{ DocumentFolderRepository },
	(
		{ documentFolderRepository },
	) => (input: Input) => documentFolderRepository.remove(input.ownerDocumentFolder),
);
