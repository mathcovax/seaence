import { GetPostsFromArticleUsecase } from "@business/applications/usecases/getPostsFromArticle";
import { articleIdObjecter } from "@business/domains/entities/article";

useBuilder()
	.createRoute("GET", "/articles/{articleId}/posts")
	.extract({
		params: {
			articleId: articleIdObjecter.toZodSchema(),
		},
	})
	.handler(
		async(pickup) => {
			const articleId = pickup("articleId");

			const usecase = new GetPostsFromArticleUsecase();
			const posts = await usecase.execute({
				articleId,
			});

			return new OkHttpResponse(
				"posts.found",
				posts,
			);
		},
	);
