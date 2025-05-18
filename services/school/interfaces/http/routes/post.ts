import { userObjecter } from "@business/domains/common/user";
import {
	nodeSameRawDocumentIdObjecter,
	postContentObjecter,
	postIdObjecter,
	postTopicObjecter,
} from "@business/domains/entities/post";
import {
	createPostUsecase,
	findPostsFromNodeSameRawDocumentIdUsecase,
	getPostTotalCountFromNodeSameRawDocumentIdUsecase,
} from "@interfaces/usecase";
import { intObjecter } from "@vendors/clean";
import { endpointCreatePost, endpointPostSchema, endpointPostsDetails } from "../schemas/post";
import { iWantPostExistById } from "../checkers/post";

useBuilder()
	.createRoute("GET", "/documents/{nodeSameRawDocumentId}/posts")
	.extract({
		params: {
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
		},
		query: {
			page: zoderce.number().pipe(intObjecter.toZodSchema()),
			quantityPerPage: zoderce.number().pipe(intObjecter.toZodSchema()),
		},
	})
	.handler(
		async(pickup) => {
			const { nodeSameRawDocumentId, page, quantityPerPage } = pickup(["nodeSameRawDocumentId", "page", "quantityPerPage"]);

			const posts = await findPostsFromNodeSameRawDocumentIdUsecase.execute({
				quantityPerPage,
				nodeSameRawDocumentId,
				page,
			}).then((posts) => posts.map(
				(post) => post.toSimpleObject(),
			));

			return new OkHttpResponse(
				"posts.found",
				posts,
			);
		},
		makeResponseContract(OkHttpResponse, "posts.found", endpointPostSchema.array()),
	);

useBuilder()
	.createRoute("GET", "/documents/{nodeSameRawDocumentId}/posts-details")
	.extract({
		params: {
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
		},
	})
	.handler(
		async(pickup) => {
			const { nodeSameRawDocumentId } = pickup(["nodeSameRawDocumentId"]);

			const totalCount = await getPostTotalCountFromNodeSameRawDocumentIdUsecase.execute({
				nodeSameRawDocumentId,
			});

			return new OkHttpResponse(
				"document.posts.details",
				{ totalCount: totalCount.value },
			);
		},
		makeResponseContract(OkHttpResponse, "document.posts.details", endpointPostsDetails),
	);

useBuilder()
	.createRoute("POST", "/posts")
	.extract({
		body: zod.object({
			topic: postTopicObjecter.toZodSchema(),
			content: postContentObjecter.toZodSchema(),
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			author: userObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { topic, content, nodeSameRawDocumentId, author } = pickup("body");

			const createdPost = await createPostUsecase.execute({
				topic,
				content,
				nodeSameRawDocumentId,
				author,
			});

			return new CreatedHttpResponse(
				"post.created",
				{
					id: createdPost.id.value,
				},
			);
		},
		makeResponseContract(CreatedHttpResponse, "post.created", endpointCreatePost),
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
