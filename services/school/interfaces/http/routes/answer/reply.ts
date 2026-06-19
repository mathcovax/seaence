import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE, E } from "@duplojs/utils";
import { useCases } from "@adapters/useCases";
import { Answer } from "@domains/entities/answer";
import { Post } from "@domains/entities/post";
import { UserId, UserName } from "@domains/common/user";
import { iWantPostExistsById, iWantPostWithAvailableStatus } from "@http/checkers";

useRouteBuilder("POST", "/reply-to-post")
	.extract({
		body: DPE.object({
			postId: Post.Id.toExtractParser(),
			content: Answer.Content.toExtractParser(),
			authorId: UserId.toExtractParser(),
			authorName: UserName.toExtractParser(),
		}),
	})
	.presetCheck(
		iWantPostExistsById,
		({ body }) => body.postId,
	)
	.presetCheck(
		iWantPostWithAvailableStatus,
		(floor) => floor.post,
	)
	.handler(
		[
			ResponseContract.created("answer.created"),
			ResponseContract.unprocessableContent("replyToPost.failed"),
		],
		({ body, post }, { response }) => useCases
			.replyToPostUseCase({
				post,
				content: body.content,
				authorId: body.authorId,
				authorName: body.authorName,
			})
			.then(
				(result) => {
					if (E.isLeft(result)) {
						return response("replyToPost.failed");
					}

					return response("answer.created");
				},
			),
	);
