import { C } from "@duplojs/utils";
import { DocumentFolderRepository, type PartialDocumentFolderNameConstraint } from "@business/applications/repositories/documentFolder";
import type { UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialDocumentFolderName: PartialDocumentFolderNameConstraint;
}

export const OwnerCountResultOfSearchDocumentUseCase = C.createUseCase(
	{ DocumentFolderRepository },
	(
		{ documentFolderRepository },
	) => (input: Input) => documentFolderRepository.countResultOfFindMany(input),
);
