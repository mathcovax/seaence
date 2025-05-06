import { type PostEntity } from "@business/domains/entities/post";
import { type Int, UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";

interface Input {
	post: PostEntity;
	page: Int;
	quantityPerPage: Int;
}

export class FindAnswersFromPostUsecase extends UsecaseHandler.create({
	answerRepository,
}) {
	public execute({ post, page, quantityPerPage }: Input) {
		return this.answerRepository.findByPostId(
			post.id,
			{
				quantityPerPage,
				page,
			},
		);
	}
}
