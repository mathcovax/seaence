import { documentFolderRepository } from "@business/applications/repositories/documentFolder";
import { type UserId } from "@business/domains/common/user";
import { type NodeSameRawDocumentId } from "@business/domains/entities/documentInFolder";
import { type Text, UsecaseHandler } from "@vendors/clean";

interface Input {
	userId: UserId;
	partialDocumentFolderName: Text;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
}

export class CountResultOfFindManyDocumentFolderInWichDocumentExistUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public execute(input: Input) {
		return this.documentFolderRepository
			.countResultOfFindManyFolderInWhichDocumentExist(input);
	}
}
