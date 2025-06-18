import { BackedDocument } from "@business/entities/bakedDocument";
import { Post } from "@business/entities/forum/post";
import { iWantDocumentExistById } from "@interfaces/http/checkers/document";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { SchoolAPI } from "@interfaces/providers/school";

useMustBeConnectedBuilder({ unauthorizedBannedUser: true })
	.createRoute("POST", "/create-post")
	.extract({
		body: zod.object({
			topic: Post.topic,
			content: Post.content,
			documentId: BackedDocument.id,
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

			const createdPost = await SchoolAPI.createPost({
				topic,
				content,
				nodeSameRawDocumentId: document.nodeSameRawDocumentId,
				authorId: user.id,
				authorName: user.username,
			});

			return new CreatedHttpResponse(
				"post.created",
				createdPost.body,
			);
		},
		makeResponseContract(CreatedHttpResponse, "post.created", Post.createdPost),
	);
