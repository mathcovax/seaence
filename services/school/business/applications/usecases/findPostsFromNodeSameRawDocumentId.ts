import { type Int, UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type NodeSameRawDocumentId } from "@business/domains/entities/post";

interface Input {
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	page: Int;
	quantityPerPage: Int;
}

export class FindPostsFromNodeSameRawDocumentIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ nodeSameRawDocumentId, page, quantityPerPage }: Input) {
		return this.postRepository.findByNodeSameRawDocumentId(
			nodeSameRawDocumentId,
			{
				quantityPerPage,
				page,
			},
		);
	}
}
