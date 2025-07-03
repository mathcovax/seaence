import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { type UserId } from "@business/domains/common/user";
import { type NodeSameRawDocumentId } from "@business/domains/entities/documentInFolder";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	userId: UserId;
	nodeSameRawDocumentIds: NodeSameRawDocumentId[];
}

export class NodeSameRawDocumentIdsHaveDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ userId, nodeSameRawDocumentIds }: Input) {
		return this.documentInFolderRepository
			.nodeSameRawDocumentIdsHaveDocumentInFolder(
				userId,
				nodeSameRawDocumentIds,
			);
	}
}
