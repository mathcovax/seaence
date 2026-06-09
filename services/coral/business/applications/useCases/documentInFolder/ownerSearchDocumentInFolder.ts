import { C } from "@duplojs/utils";
import { DocumentInFolderRepository, type PartialDocumentInFolderNameConstraint } from "@business/applications/repositories/documentInFolder";
import { type DocumentFolder } from "@business/domains/entities/documentFolder";

interface Input {
	ownerDocumentFolder: DocumentFolder.Entity & DocumentFolder.WithCheckedOwner;
	partialDocumentInFolderName: PartialDocumentInFolderNameConstraint;
	page: C.Int;
	quantityPerPage: C.PositiveInt;
}

export const OwnerSearchDocumentInFolderUseCase = C.createUseCase(
	{ DocumentInFolderRepository },
	(
		{ documentInFolderRepository },
	) => (input: Input) => documentInFolderRepository.findMany({
		...input,
		documentFolder: input.ownerDocumentFolder,
	}),
);
