import { SchoolAPI } from "@interfaces/providers/school";
import { endpointCreatePostPage, endpointPostListPageSchema, endpointPostPageSchema, endpointPostSchema, entrypointCreatePost } from "../schemas/post";
import { iWantDocumentExistById } from "../checkers/document";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";
import { iWantPostExistById } from "../checkers/post";
import { postConfig } from "@interfaces/configs/post";
import { answerConfig } from "@interfaces/configs/answer";
import { match } from "ts-pattern";
import { bakedDocumentLanguageObjecter } from "@business/entities/bakedDocument";

useMustBeConnectedBuilder()
	.createRoute("POST", "/create-post")
	.extract({
		body: entrypointCreatePost,
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("body").documentId,
	)
	.handler(
		async(pickup) => {
			const { user, body, document } = pickup(["user", "body", "document"]);
			const { topic, content } = body;

			const createdPost = await SchoolAPI.createPost({
				topic,
				content,
				nodeSameRawDocumentId: document.nodeSameRawDocumentId,
				author: {
					id: user.id,
					username: user.username,
				},
			});

			return new CreatedHttpResponse(
				"post.created",
				createdPost.body,
			);
		},
		makeResponseContract(CreatedHttpResponse, "post.created", endpointCreatePostPage),
	);

useBuilder()
	.createRoute("POST", "/post-list")
	.extract({
		body: {
			documentId: zod.string(),
			page: zod.number(),
		},
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("documentId"),
	)
	.handler(
		async(pickup) => {
			const { page, document } = pickup(["page", "document"]);

			const { body: posts } = await SchoolAPI.findPosts(
				document.nodeSameRawDocumentId,
				postConfig.findPosts.quantityPerPage,
				page - postConfig.findPosts.pageOffset,
			);

			return new OkHttpResponse(
				"postList.found",
				posts,
			);
		},
		makeResponseContract(OkHttpResponse, "postList.found", endpointPostSchema.array()),
	);

useBuilder()
	.createRoute("POST", "/post-page")
	.extract({
		body: {
			postId: zod.string(),
			language: bakedDocumentLanguageObjecter.zodSchema,
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.cut(
		({ pickup, dropper }) => {
			const { post, language } = pickup(["post", "language"]);
			return dropper({
				documentId: `${post.nodeSameRawDocumentId}_${language}`,
			});
		},
		["documentId"],
	)
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("documentId"),
	)
	.handler(
		(pickup) => {
			const { post, document } = pickup(["post", "document"]);

			return new OkHttpResponse(
				"postPage.found",
				{
					post,
					document: {
						id: document.id,
						title: document.title,
						language: document.language,
					},
					quantityAnswerPerPage: answerConfig.findAnswers.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "postPage.found", endpointPostPageSchema),
	);

useBuilder()
	.createRoute("POST", "/post-list-page")
	.extract({
		body: {
			documentId: zod.string(),
		},
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("documentId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { document } = pickup(["document"]);
			const details = await SchoolAPI.findDocumentPostsDetails(document.nodeSameRawDocumentId);

			return match(details)
				.with(
					{ information: "document.posts.details" },
					({ body }) => dropper({ documentPostsDetails: body }),
				)
				.exhaustive();
		},
		["documentPostsDetails"],
	)
	.handler(
		(pickup) => {
			const { document, documentPostsDetails } = pickup(["document", "documentPostsDetails"]);

			return new OkHttpResponse(
				"postListPage.found",
				{
					document: {
						id: document.id,
						title: document.title,
						language: document.language,
					},
					totalPostCount: documentPostsDetails.totalCount,
					quantityPostPerPage: postConfig.findPosts.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "postListPage.found", endpointPostListPageSchema),
	);
