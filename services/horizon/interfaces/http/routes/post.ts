import { SchoolAPI } from "@interfaces/providers/school";
import { endpointPostListSchema, endpointPostSchema } from "../schemas/post";
import { iWantDocumentExistById } from "../checkers/document";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";
import { iWantPostExistById } from "../checkers/post";
import { documentLanguageSchema } from "../schemas/document";

useMustBeConnectedBuilder()
	.createRoute("POST", "/posts")
	.extract({
		body: zod.object({
			topic: zod.string(),
			content: zod.string(),
			documentId: zod.string(),
		}),
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("body").documentId,
	)
	.handler(
		async(pickup) => {
			const { user, body, document } = pickup(["user", "body", "document"]);
			const { topic, content } = body;

			await SchoolAPI.createPost({
				topic,
				content,
				nodeDocumentId: document.nodeSameRawDocumentId,
				author: {
					id: user.id,
					username: user.username,
				},
			});

			return new CreatedHttpResponse(
				"post.created",
			);
		},
		makeResponseContract(CreatedHttpResponse, "post.created"),
	);

useBuilder()
	.createRoute("GET", "/documents/{documentId}/posts")
	.extract({
		params: {
			documentId: zod.string(),
		},
		query: {
			page: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("documentId"),
	)
	.handler(
		async(pickup) => {
			const { page, document } = pickup(["page", "document"]);

			const { body: postList } = await SchoolAPI.getPosts(
				document.nodeSameRawDocumentId,
				page,
			);

			return new OkHttpResponse(
				"posts.found",
				{
					postList,
					document,
				},
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
		query: {
			language: documentLanguageSchema,
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.cut(
		({ pickup, dropper }) => {
			const { language, post: { nodeDocumentId } } = pickup(["language", "post"]);
			return dropper({
				documentId: `${nodeDocumentId}_${language}`,
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
				"post.found",
				{
					...post,
					document,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "post.found", endpointPostSchema),
	);
