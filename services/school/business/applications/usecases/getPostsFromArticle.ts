import { createUsecaseHandler } from "@vendors/clean";
import { type ArticleId } from "@business/domains/entities/article";
import { postRepository } from "../repositories/post";

interface Input {
	articleId: ArticleId;
}

export const getPostsFromArticleUsecase = createUsecaseHandler(
	"getPostsFromArticle",
	{
		postRepository,
	},
	async(
		{ postRepository },
		{ articleId }: Input,
	) => postRepository.findByArticleId(articleId),
);
