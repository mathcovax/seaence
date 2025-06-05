import { type PostEntity } from "@business/domains/entities/post";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";

interface Input {
	post: PostEntity;
}

export class IndicatePostIsNotCompliantUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ post }: Input) {
		if (!post.isUnprocessed()) {
			return new UsecaseError("wrong-status");
		}

		const updatedPost = post.updateStatus("notCompliant");

		return this.postRepository.save(updatedPost);
	}
}
