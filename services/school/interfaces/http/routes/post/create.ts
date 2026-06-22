import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, C, DPE, E } from "@duplojs/utils";
import { useCases } from "@adapters/useCases";
import { Post } from "@domains/entities/post";
import { UserId, UserName } from "@domains/common/user";

useRouteBuilder("POST", "/create-post")
	.extract({
		body: DPE.object({
			topic: Post.Topic.toExtractParser(),
			content: Post.Content.toExtractParser(),
			nodeSameRawDocumentId: Post.NodeSameRawDocumentId.toExtractParser(),
			authorId: UserId.toExtractParser(),
			authorName: UserName.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.created("post.created", Post.Entity.toEndpointSchema()),
		({ body }, { response }) => asyncPipe(
			useCases.createPostUseCase(body),
			E.unwrapSelectionOrThrow({
				"post.create.wrongStatus": false,
				"post.created": true,
			}),
			({ post }) => response("post.created", C.unwrapEntity(post)),
		),
	);
