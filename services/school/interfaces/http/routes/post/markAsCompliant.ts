import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE } from "@duplojs/utils";
import { useCases } from "@adapters/useCases";
import { Post } from "@domains/entities/post";
import { iWantPostExistsById, iWantPostWithUnprocessedStatus } from "@http/checkers";

useRouteBuilder("POST", "/mark-post-as-compliant")
	.extract({
		body: DPE.object({
			postId: Post.Id.toExtractParser(),
		}),
	})
	.presetCheck(
		iWantPostExistsById,
		(floor) => floor.body.postId,
	)
	.presetCheck(
		iWantPostWithUnprocessedStatus,
		(floor) => floor.post,
	)
	.handler(
		ResponseContract.noContent("post.markAsCompliant"),
		({ post }, { response }) => useCases
			.markPostAsCompliantUseCase({ post })
			.then(
				() => response("post.markAsCompliant"),
			),
	);
