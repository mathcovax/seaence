import { createUsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { type UserId } from "@business/domains/entities/user";
import { AnswerEntity, type AnswerContent } from "@business/domains/entities/answer";
import { type PostId } from "@business/domains/entities/post";

interface ReplyToPostInput {
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
		{ postId, content, responderId }: ReplyToPostInput,
	) => {
		const answer = AnswerEntity.create({
			postId,
			content,
			responderId,
		});

		return answerRepository.replyToPost(answer);
	},
);
