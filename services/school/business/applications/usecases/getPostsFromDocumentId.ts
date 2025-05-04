import { type Int, intObjecter, UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type NodeDocumentId } from "@business/domains/entities/post";

interface Input {
	nodeDocumentId: NodeDocumentId;
	page: Int;
}

const rawQuantityPerPage = 20;
export const quantityPerPage = intObjecter.unknownUnsafeCreate(rawQuantityPerPage);

export class GetPostsFromDocumentIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ nodeDocumentId, page }: Input) {
		return this.postRepository.findByNodeDocumentId(
			nodeDocumentId,
			{
				quantityPerPage,
				page,
			},
		);
	}
}
