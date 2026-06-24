import { C } from "@duplojs/utils";
import { DocumentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import type { UserId } from "@business/domains/common/user";
import type { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";

interface Input {
	userId: UserId;
	nodeSameRawDocumentIds: NodeSameRawDocumentId[];
}
export const NodeSameRawDocumentIdsHaveDocumentInFolderUseCase = C.createUseCase(
	{ DocumentInFolderRepository },
	({
		documentInFolderRepository,
	}) => (input: Input) => documentInFolderRepository
		.nodeSameRawDocumentIdsHaveDocumentInFolder(input),
);
