import { iWantDocumentExistById } from "@interfaces/http/checkers/document";
import { endpointCreatePostPage, entrypointCreatePost } from "@interfaces/http/schemas/post";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { SchoolAPI } from "@interfaces/providers/school";

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
