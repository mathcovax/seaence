import { DocumentInFolderRepository, type PartialDocumentInFolderNameConstraint } from "@business/applications/repositories/documentInFolder";
import type { DocumentFolder } from "@business/domains/entities/documentFolder";
import { C } from "@duplojs/utils";

interface Input {
	ownerDocumentFolder: DocumentFolder.Entity & DocumentFolder.WithCheckedOwner;
	partialDocumentInFolderName: PartialDocumentInFolderNameConstraint;
}

export const CountResultOfOwnerSearchDocumentInFolderUseCase = C.createUseCase(
	{ DocumentInFolderRepository },
	(
		{ documentInFolderRepository },
	) => (input: Input) => documentInFolderRepository.countResultOfFindMany({
		documentFolder: input.ownerDocumentFolder,
		partialDocumentInFolderName: input.partialDocumentInFolderName,
	}),
);
