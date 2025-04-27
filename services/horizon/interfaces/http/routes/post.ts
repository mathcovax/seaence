import { SchoolAPI } from "@interfaces/providers/school";
import { endpointPostListSchema, endpointPostSchema } from "../schemas/post";
import { iWantArticleExistById } from "../checkers/article";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";

useMustBeConnectedBuilder()
	.createRoute("POST", "/posts")
	.extract({
		body: zod.object({
			topic: zod.string(),
			content: zod.string(),
			article: zod.object({
				id: zod.string(),
				title: zod.string(),
			}),
		}),
	})
	.presetCheck(
		iWantArticleExistById,
		(pickup) => pickup("body").article.id,
	)
	.handler(
		async(pickup) => {
			const { user, body } = pickup(["user", "body"]);
			const { article, topic, content } = body;

			const schoolReponse = await SchoolAPI.createPost({
				topic,
				content,
				article: {
					id: article.id,
					title: article.title,
				},
				author: {
					id: user.id,
					username: user.username,
				},
			});

			return new CreatedHttpResponse(
				"post.created",
				schoolReponse.body,
			);
		},
		makeResponseContract(CreatedHttpResponse, "post.created", endpointPostSchema),
	);

useBuilder()
	.createRoute("GET", "/articles/{articleId}/posts")
	.extract({
		params: {
			articleId: zod.string(),
		},
		query: {
			page: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantArticleExistById,
		(pickup) => pickup("articleId"),
	)
	.handler(
		async(pickup) => {
			const { articleId, page } = pickup(["articleId", "page"]);

			const schoolResponse = await SchoolAPI.getPosts(
				articleId,
				page,
			);

			return new OkHttpResponse(
				"posts.found",
				schoolResponse.body,
			);
		},
		makeResponseContract(OkHttpResponse, "posts.found", endpointPostListSchema),
	);

useBuilder()
	.createRoute("GET", "/posts/{postId}")
	.extract({
		params: {
			postId: zod.string(),
		},
	})
	.handler(
		async(pickup) => {
			const postId = pickup("postId");

			const schoolResponse = await SchoolAPI.getPost(postId);

			return new OkHttpResponse(
				"post.found",
				schoolResponse.body,
			);
		},
		makeResponseContract(OkHttpResponse, "post.found", endpointPostSchema),
	);
