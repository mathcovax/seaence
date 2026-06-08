import { C } from "@duplojs/utils";
import { DocumentFolderRepository, type PartialDocumentFolderNameConstraint } from "@business/applications/repositories/documentFolder";
import type { UserId } from "@business/domains/common/user";
import type { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";

interface Input {
	userId: UserId;
	partialDocumentFolderName: PartialDocumentFolderNameConstraint;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
}

export const CountResultOfOwnerSearchIfNodeSameRawDocumentExistInTheseDocumentFoldersUseCase = C.createUseCase(
	{ DocumentFolderRepository },
	(
		{ documentFolderRepository },
	) => (input: Input) => documentFolderRepository.countResultOfFindManyByNodeSameRawDocument(input),
);
