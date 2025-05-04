import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type NodeDocumentId } from "@business/domains/entities/post";

interface Input {
	nodeDocumentId: NodeDocumentId;
}

export class GetPostTotalCountFromDocumentIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ nodeDocumentId }: Input) {
		return this.postRepository.getTotalCountByNodeDocumentId(
			nodeDocumentId,
		);
	}
}
