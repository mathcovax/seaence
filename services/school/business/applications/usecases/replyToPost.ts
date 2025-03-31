import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { type UserId } from "@business/domains/entities/user";
import { AnswerEntity, type AnswerContent } from "@business/domains/entities/answer";
import { type PostId } from "@business/domains/entities/post";

interface Input {
	postId: PostId;
	content: AnswerContent;
	responderId: UserId;
}

export class ReplyToPostUsecase extends UsecaseHandler.create(
	{
		answerRepository,
	},
) {
	public execute({ postId, content, responderId }: Input) {
		const answer = AnswerEntity.create({
			answerId: this.answerRepository.generateAnswerId(),
			postId,
			content,
			responderId,
		});

		return this.answerRepository.save(answer);
	}
}
