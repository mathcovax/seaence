import { type PostEntity } from "@business/domains/entities/post";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";

interface Input {
	post: PostEntity;
}

export class IndicatePostIsCompliantUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ post }: Input) {
		if (!post.isUnprocessed()) {
			return new UsecaseError("wrong-status", { post });
		}

		const updatedPost = post.updateStatus("compliant");

		return this.postRepository.save(updatedPost);
	}
}
