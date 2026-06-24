import { C } from "@duplojs/utils";
import { DocumentFolderRepository, type PartialDocumentFolderNameConstraint } from "@business/applications/repositories/documentFolder";
import type { UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialDocumentFolderName: PartialDocumentFolderNameConstraint;
	page: C.Int;
	quantityPerPage: C.PositiveInt;
}

export const OwnerSearchDocumentFolderUseCase = C.createUseCase(
	{ DocumentFolderRepository },
	(
		{ documentFolderRepository },
	) => (input: Input) => documentFolderRepository.findMany(input),
);
