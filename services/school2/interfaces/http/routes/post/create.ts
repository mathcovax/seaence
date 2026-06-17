import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE } from "@duplojs/utils";
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
		ResponseContract.created("post.created"),
		({ body }, { response }) => useCases
			.createPostUseCase(body)
			.then(
				() => response("post.created"),
			),
	);
