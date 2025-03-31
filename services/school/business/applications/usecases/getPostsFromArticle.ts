import { UsecaseHandler } from "@vendors/clean";
import { type ArticleId } from "@business/domains/entities/article";
import { postRepository } from "../repositories/post";

interface Input {
	articleId: ArticleId;
}

export class GetPostsFromArticleUsecase extends UsecaseHandler.create(
	{
		postRepository,
	},
) {
	public execute({ articleId: article }: Input) {
		return this.postRepository.findByArticleId(article);
	}
}
