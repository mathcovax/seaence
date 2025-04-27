import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { type PostEntity } from "@business/domains/entities/post";
import { postRepository } from "../repositories/post";

interface Input {
	post: PostEntity;
}

export class ComputePostAnswerUsecase extends UsecaseHandler.create({
	answerRepository,
	postRepository,
}) {
	public async execute({ post }: Input) {
		const count = await this.answerRepository.getCountByPostId(post.id);

		const updatedPost = post.updateAnswerCount(count);

		return this.postRepository.save(updatedPost);
	}
}

