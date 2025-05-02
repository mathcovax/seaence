import { documentObjecter } from "@business/domains/common/document";
import { userObjecter } from "@business/domains/common/user";
import { documentIdObjecter } from "@business/domains/entities/document";
import {
	postContentObjecter,
	postIdObjecter,
	postTopicObjecter,
} from "@business/domains/entities/post";
import {
	createPostUsecase,
	getPostsFromdocumentIdUsecase,
	getPostTotalCountFromdocumentIdUsecase,
} from "@interfaces/usecase";
import { intObjecter, toSimpleObject } from "@vendors/clean";
import { endpointPostListSchema, endpointPostSchema } from "../schemas/post";
import { iWantPostExistById } from "../checkers/post";
import { quantityPerPage } from "@business/applications/usecases/getPostsFromDocumentId";

useBuilder()
	.createRoute("GET", "/documents/{documentId}/posts")
	.extract({
		params: {
			documentId: documentIdObjecter.toZodSchema(),
		},
		query: {
			page: zoderce.number().pipe(intObjecter.toZodSchema()),
		},
	})
	.handler(
		async(pickup) => {
			const { documentId, page } = pickup(["documentId", "page"]);

			const [
				totalCount,
				posts,
			] = await Promise.all(
				[
					getPostTotalCountFromdocumentIdUsecase.execute({
						documentId,
					}),
					getPostsFromdocumentIdUsecase.execute({
						documentId,
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
			document: documentObjecter.toZodSchema(),
			author: userObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { topic, content, document, author } = pickup("body");

			const createdPost = await createPostUsecase.execute({
				topic,
				content,
				document,
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
