import { articleObjecter } from "@business/domains/common/article";
import { intObjecter } from "@business/domains/common/Int";
import { userObjecter } from "@business/domains/common/user";
import { articleIdObjecter } from "@business/domains/entities/article";
import {
	postContentObjecter,
	postTopicObjecter,
} from "@business/domains/entities/post";
import {
	createPostUsecase,
	getPostsFromArticleIdUsecase,
} from "@interfaces/usecase";
import { toSimpleObject } from "@vendors/clean";
import { endpointPostSchema } from "../schemas/post";

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

			const posts = await getPostsFromArticleIdUsecase
				.execute({
					articleId,
					page,
				})
				.then((posts) => posts.map(toSimpleObject));

			return new OkHttpResponse(
				"posts.found",
				posts,
			);
		},
		makeResponseContract(OkHttpResponse, "posts.found", endpointPostSchema.array()),
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
