import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type Int, intObjecter } from "@business/domains/common/Int";
import { type ArticleId } from "@business/domains/entities/article";

interface Input {
	articleId: ArticleId;
	page: Int;
}

const rawQuantityPerPage = 10;
const quantityPerPage = intObjecter.unsafeCreate(rawQuantityPerPage);

export class GetPostsFromArticleIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ articleId, page }: Input) {
		return this.postRepository.findByArticleId(
			articleId,
			{
				quantityPerPage,
				page,
			},
		);
	}
}
