import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { AnswerEntity, type AnswerContent } from "@business/domains/entities/answer";
import { type PostEntity } from "@business/domains/entities/post";
import { type User } from "@business/domains/common/user";

interface Input {
	post: PostEntity;
	content: AnswerContent;
	author: User;
}

export class ReplyToPostUsecase extends UsecaseHandler.create({
	answerRepository,
}) {
	public execute({ post, content, author }: Input) {
		const answer = AnswerEntity.create({
			id: this.answerRepository.generateAnswerId(),
			postId: post.id,
			content,
			author,
		});

		return this.answerRepository.save(answer);
	}
}
