import { createUsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { type UserId } from "@business/domains/entities/user";
import { AnswerEntity, type AnswerContent } from "@business/domains/entities/answer";
import { type PostId } from "@business/domains/entities/post";

interface Input {
	postId: PostId;
	content: AnswerContent;
	responderId: UserId;
}

export const replyToPostUsecase = createUsecaseHandler(
	"replyToPost",
	{
		answerRepository,
	},
	async(
		{ answerRepository },
		{ postId, content, responderId }: Input,
	) => {
		const answer = AnswerEntity.create({
			answerId: await answerRepository.generateId(),
			postId,
			content,
			responderId,
		});

		return answerRepository.replyToPost(answer);
	},
);
