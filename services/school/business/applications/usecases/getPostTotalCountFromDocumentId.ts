import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type DocumentId } from "@business/domains/entities/document";

interface Input {
	documentId: DocumentId;
}

export class GetPostTotalCountFromDocumentIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ documentId }: Input) {
		return this.postRepository.getTotalCountByDocumentId(
			documentId,
		);
	}
}
