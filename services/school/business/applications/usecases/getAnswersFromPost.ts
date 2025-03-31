import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { type PostId } from "@business/domains/entities/post";

interface Input {
	postId: PostId;
}

export class GetAnswersFromPostUsecase extends UsecaseHandler.create(
	{
		answerRepository,
	},
) {
	public execute({ postId: post }: Input) {
		return this.answerRepository.findByPostId(post);
	}
}
