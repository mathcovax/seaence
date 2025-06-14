import {
	nodeSameRawDocumentIdObjecter,
	postContentObjecter,
	PostEntity,
	postIdObjecter,
	postTopicObjecter,
} from "@business/domains/entities/post";
import {
	createPostUsecase,
	findPostsFromNodeSameRawDocumentIdUsecase,
	findOldestUnprocessedPostUsecase,
	getPostTotalCountFromNodeSameRawDocumentIdUsecase,
	indicatePostIsNotCompliantAndCreateWarningUsecase,
	indicatePostIsCompliantUsecase,
	getTotalCountOfUnprocessedPostsUsecase,
} from "@interfaces/usecase";
import { intObjecter, UsecaseError } from "@vendors/clean";
import { endpointCreatePost, endpointPostSchema, endpointPostsDetails, endpointUnprocessedPostDetails } from "../schemas/post";
import { iWantPostExistById } from "../checkers/post";
import { userObjecter } from "@business/domains/common/user";
import { userIdObjecter } from "@business/domains/entities/user";
import { warningMakeUserBanObjecter, warningReasonObjecter } from "@business/domains/entities/warning";
import { match, P } from "ts-pattern";

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
	.cut(
		async({ dropper }) => {
			const result = await findOldestUnprocessedPostUsecase.execute();

			return match({ result })
				.with(
					{ result: null },
					() => new NotFoundHttpResponse("oldestUnprocessedPost.notfound"),
				)
				.with(
					{ result: P.instanceOf(PostEntity) },
					({ result: post }) => dropper({ post }),
				)
				.exhaustive();
		},
		["post"],
		makeResponseContract(NotFoundHttpResponse, "oldestUnprocessedPost.notfound"),
	)
	.handler(
		(pickup) => {
			const post = pickup("post");

			return new OkHttpResponse(
				"oldestUnprocessedPost.found",
				post.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "oldestUnprocessedPost.found", endpointPostSchema),
	);

useBuilder()
	.createRoute("GET", "/unprocessed-post-details")
	.handler(
		async() => {
			const totalCount = await getTotalCountOfUnprocessedPostsUsecase.execute();

			return new OkHttpResponse(
				"unprocessedPost.details",
				{ totalCount: totalCount.value },
			);
		},
		makeResponseContract(OkHttpResponse, "unprocessedPost.details", endpointUnprocessedPostDetails),
	);

useBuilder()
	.createRoute("PATCH", "/posts/{postId}/is-compliant")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const post = pickup("post");

			const updatedPost = await indicatePostIsCompliantUsecase.execute({
				post,
			});

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

useBuilder()
	.createRoute("PATCH", "/posts/{postId}/is-not-compliant")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
		body: {
			makeUserBan: warningMakeUserBanObjecter.toZodSchema(),
			reason: warningReasonObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const {
				post,
				makeUserBan,
				reason,
			} = pickup(["post", "makeUserBan", "reason"]);

			const updatedPost = await indicatePostIsNotCompliantAndCreateWarningUsecase.execute({
				post,
				reason,
				makeUserBan,
			});

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
