import { SchoolAPI } from "@interfaces/providers/school";
import { endpointPostListSchema, endpointPostSchema } from "../schemas/post";
import { iWantDocumentExistById } from "../checkers/document";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";
import { iWantPostExistById } from "../checkers/post";

useMustBeConnectedBuilder()
	.createRoute("POST", "/posts")
	.extract({
		body: zod.object({
			topic: zod.string(),
			content: zod.string(),
			document: zod.object({
				id: zod.string(),
				title: zod.string(),
			}),
		}),
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("body").document.id,
	)
	.handler(
		async(pickup) => {
			const { user, body } = pickup(["user", "body"]);
			const { document, topic, content } = body;

			const schoolReponse = await SchoolAPI.createPost({
				topic,
				content,
				document: {
					id: document.id,
					title: document.title,
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
			const { documentId, page } = pickup(["documentId", "page"]);

			const schoolResponse = await SchoolAPI.getPosts(
				documentId,
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
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.handler(
		(pickup) => {
			const post = pickup("post");

			return new OkHttpResponse(
				"post.found",
				post,
			);
		},
		makeResponseContract(OkHttpResponse, "post.found", endpointPostSchema),
	);
