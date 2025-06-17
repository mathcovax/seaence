import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { AnswerEntity, type AnswerContent } from "@business/domains/entities/answer";
import { type PostEntity } from "@business/domains/entities/post";
import { type UserId, type Username } from "@business/domains/common/user";
import { postRepository } from "../repositories/post";
import { ComputePostAnswerUsecase } from "./computePostAnswer";

interface Input {
	post: PostEntity;
	content: AnswerContent;
	authorId: UserId;
	authorName: Username;
}

export class ReplyToPostUsecase extends UsecaseHandler.create({
	answerRepository,
	postRepository,
	computePostAnswer: ComputePostAnswerUsecase,
}) {
	public async execute(
		{
			post,
			content,
			authorId,
			authorName,
		}: Input,
	) {
		const answer = AnswerEntity.create({
			id: this.answerRepository.generateAnswerId(),
			postId: post.id,
			content,
			authorId,
			authorName,
		});

		await this.answerRepository.save(answer);
		await this.computePostAnswer({ post });

		return answer;
	}
}
