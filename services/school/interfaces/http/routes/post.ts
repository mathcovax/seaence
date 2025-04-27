import { articleObjecter } from "@business/domains/common/article";
import { intObjecter } from "@business/domains/common/Int";
import { userObjecter } from "@business/domains/common/user";
import { articleIdObjecter } from "@business/domains/entities/article";
import {
	postContentObjecter,
	postIdObjecter,
	postTopicObjecter,
} from "@business/domains/entities/post";
import {
	createPostUsecase,
	getPostsFromArticleIdUsecase,
	getPostTotalCountFromArticleIdUsecase,
} from "@interfaces/usecase";
import { toSimpleObject } from "@vendors/clean";
import { endpointPostListSchema, endpointPostSchema } from "../schemas/post";
import { iWantPostExistById } from "../checkers/post";
import { quantityPerPage } from "@business/applications/usecases/getPostsFromArticleId";

useBuilder()
	.createRoute("GET", "/articles/{articleId}/posts")
	.extract({
		params: {
			articleId: articleIdObjecter.toZodSchema(),
		},
		query: {
			page: zoderce.number().pipe(intObjecter.toZodSchema()),
		},
	})
	.handler(
		async(pickup) => {
			const { articleId, page } = pickup(["articleId", "page"]);

			const [
				totalCount,
				posts,
			] = await Promise.all(
				[
					getPostTotalCountFromArticleIdUsecase.execute({
						articleId,
					}),
					getPostsFromArticleIdUsecase.execute({
						articleId,
						page,
					}).then((posts) => posts.map(toSimpleObject)),
				],
			);

			return new OkHttpResponse(
				"posts.found",
				{
					posts,
					totalCount: totalCount.value,
					quantityPerPage: quantityPerPage.value,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "posts.found", endpointPostListSchema),
	);

useBuilder()
	.createRoute("POST", "/posts")
	.extract({
		body: zod.object({
			topic: postTopicObjecter.toZodSchema(),
			content: postContentObjecter.toZodSchema(),
			article: articleObjecter.toZodSchema(),
			author: userObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { topic, content, article, author } = pickup("body");

			const createdPost = await createPostUsecase.execute({
				topic,
				content,
				article,
				author,
			});

			return new CreatedHttpResponse(
				"post.created",
				createdPost.toSimpleObject(),
			);
		},
		makeResponseContract(CreatedHttpResponse, "post.created", endpointPostSchema),
	);

useBuilder()
	.createRoute("GET", "/posts/{postId}")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.handler(
		(pickup) => {
			const post = pickup("post");

			return new OkHttpResponse(
				"post.found",
				post.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "post.found", endpointPostSchema),
	);
