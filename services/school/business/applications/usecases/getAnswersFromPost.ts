import { type PostEntity } from "@business/domains/entities/post";
import { type Int, intObjecter, UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";

interface Input {
	post: PostEntity;
	page: Int;
}

const rawQuantityPerPage = 20;
const quantityPerPage = intObjecter.unknownUnsafeCreate(rawQuantityPerPage);

export class GetAnswersFromPostUsecase extends UsecaseHandler.create({
	answerRepository,
}) {
	public execute({ post, page }: Input) {
		return this.answerRepository.findByPostId(
			post.id,
			{
				quantityPerPage,
				page,
			},
		);
	}
}
