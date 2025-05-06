import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type NodeSameRawDocumentId } from "@business/domains/entities/post";

interface Input {
	nodeSameRawDocumentId: NodeSameRawDocumentId;
}

export class GetPostTotalCountFromNodeSameRawDocumentIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ nodeSameRawDocumentId }: Input) {
		return this.postRepository.getTotalCountByNodeSameRawDocumentId(
			nodeSameRawDocumentId,
		);
	}
}
