import { userObjecter } from "@business/domains/common/user";
import {
	nodeDocumentIdObjecter,
	postContentObjecter,
	postIdObjecter,
	postTopicObjecter,
} from "@business/domains/entities/post";
import {
	createPostUsecase,
	getPostsFromNodeDocumentIdUsecase,
	getPostTotalCountFromNodeDocumentIdUsecase,
} from "@interfaces/usecase";
import { intObjecter } from "@vendors/clean";
import { endpointGetPostSchema, endpointGetPostsSchema } from "../schemas/post";
import { iWantPostExistById } from "../checkers/post";
import { quantityPerPage } from "@business/applications/usecases/getPostsFromNodeDocumentId";

useBuilder()
	.createRoute("GET", "/documents/{nodeDocumentId}/posts")
	.extract({
		params: {
			nodeDocumentId: nodeDocumentIdObjecter.toZodSchema(),
		},
		query: {
			page: zoderce.number().pipe(intObjecter.toZodSchema()),
		},
	})
	.handler(
		async(pickup) => {
			const { nodeDocumentId, page } = pickup(["nodeDocumentId", "page"]);

			const [
				totalCount,
				posts,
			] = await Promise.all(
				[
					getPostTotalCountFromNodeDocumentIdUsecase.execute({
						nodeDocumentId,
					}),
					getPostsFromNodeDocumentIdUsecase.execute({
						nodeDocumentId,
						page,
					}).then((posts) => posts.map(
						(post) => ({
							...post.toSimpleObject(),
							nodeDocumentId: undefined,
						}),
					)),
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
		makeResponseContract(OkHttpResponse, "posts.found", endpointGetPostsSchema),
	);

useBuilder()
	.createRoute("POST", "/posts")
	.extract({
		body: zod.object({
			topic: postTopicObjecter.toZodSchema(),
			content: postContentObjecter.toZodSchema(),
			nodeDocumentId: nodeDocumentIdObjecter.toZodSchema(),
			author: userObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { topic, content, nodeDocumentId, author } = pickup("body");

			await createPostUsecase.execute({
				topic,
				content,
				nodeDocumentId,
				author,
			});

			return new CreatedHttpResponse(
				"post.created",
			);
		},
		makeResponseContract(CreatedHttpResponse, "post.created"),
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
		makeResponseContract(OkHttpResponse, "post.found", endpointGetPostSchema),
	);
