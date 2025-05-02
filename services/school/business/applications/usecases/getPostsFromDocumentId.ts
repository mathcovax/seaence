import { type Int, intObjecter, UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type DocumentId } from "@business/domains/entities/document";

interface Input {
	documentId: DocumentId;
	page: Int;
}

const rawQuantityPerPage = 20;
export const quantityPerPage = intObjecter.unknownUnsafeCreate(rawQuantityPerPage);

export class GetPostsFromDocumentIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ documentId, page }: Input) {
		return this.postRepository.findByDocumentId(
			documentId,
			{
				quantityPerPage,
				page,
			},
		);
	}
}
