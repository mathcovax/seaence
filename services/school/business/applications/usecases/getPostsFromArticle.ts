import { createUsecaseHandler } from "@vendors/clean";
import { type ArticleId } from "@business/domains/entities/article";
import { postRepository } from "../repositories/post";

interface GetPostsFromArticleInput {
	articleId: ArticleId;
}

export const getPostsFromArticleUsecase = createUsecaseHandler(
	"getPostsFromArticle",
	{
		postRepository,
	},
	async(
		{ postRepository },
		{ articleId }: GetPostsFromArticleInput,
	) => {
		const posts = await postRepository.findByArticleId(articleId);

		return posts;
	},
);
