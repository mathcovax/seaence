import { createUsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { type PostId } from "@business/domains/entities/post";

interface Input {
	postId: PostId;
}

export const getAnswersFromPostUsecase = createUsecaseHandler(
	"getAnswersFromPost",
	{
		answerRepository,
	},
	async(
		{ answerRepository },
		{ postId }: Input,
	) => answerRepository.findByPostId(postId),
);
