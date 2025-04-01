import { type PostEntity } from "@business/domains/entities/post";
import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { intObjecter, type Int } from "@business/domains/common/Int";

interface Input {
	post: PostEntity;
	page: Int;
}

const rawQuantityPerPage = 10;
const quantityPerPage = intObjecter.unsafeCreate(rawQuantityPerPage);

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
