import {
	nodeSameRawDocumentIdObjecter,
	postContentObjecter,
	postIdObjecter,
	postTopicObjecter,
} from "@business/domains/entities/post";
import {
	createPostUsecase,
	findPostsFromNodeSameRawDocumentIdUsecase,
	findOldestUnprocessedPostUsecase,
	getPostTotalCountFromNodeSameRawDocumentIdUsecase,
	indicatePostIsNotCompliantUsecase,
	indicatePostIsCompliantUsecase,
} from "@interfaces/usecase";
import { intObjecter, UsecaseError } from "@vendors/clean";
import { endpointCreatePost, endpointPostSchema, endpointPostsDetails, entrypointPatchPostStatus } from "../schemas/post";
import { iWantPostExistById } from "../checkers/post";
import { userObjecter } from "@business/domains/common/user";

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

			const posts = await findPostsFromNodeSameRawDocumentIdUsecase
				.execute({
					quantityPerPage,
					nodeSameRawDocumentId,
					page,
				})
				.then((posts) => posts.map(
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

useBuilder()
	.createRoute("GET", "/find-oldest-unprocessed-post")
	.handler(
		async() => {
			const post = await findOldestUnprocessedPostUsecase.execute();

			const simplePost = post?.toSimpleObject() ?? null;

			return new OkHttpResponse(
				"oldestUnprocessedPost.found",
				simplePost,
			);
		},
		makeResponseContract(OkHttpResponse, "oldestUnprocessedPost.found", endpointPostSchema.nullable()),
	);

useBuilder()
	.createRoute("PATCH", "/posts/{postId}/status")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
		body: entrypointPatchPostStatus,
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const post = pickup("post");
			const { status } = pickup("body");
			let updatedPost = null;

			if (status === "compliant") {
				updatedPost = await indicatePostIsCompliantUsecase.execute({
					post,
				});
			} else {
				updatedPost = await indicatePostIsNotCompliantUsecase.execute({
					post,
				});
			}

			if (updatedPost instanceof UsecaseError) {
				return new ForbiddenHttpResponse("post.wrongStatus");
			}

			return dropper({ updatedPost });
		},
		["updatedPost"],
		makeResponseContract(ForbiddenHttpResponse, "post.wrongStatus"),
	)
	.handler(
		(pickup) => {
			const post = pickup("updatedPost");

			return new OkHttpResponse(
				"post.updated",
				post.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "post.updated", endpointPostSchema),
	);
