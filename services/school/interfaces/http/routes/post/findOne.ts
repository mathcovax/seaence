import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C, DPE } from "@duplojs/utils";
import { Post } from "@domains/entities/post";
import { iWantPostExistsById } from "@http/checkers";

useRouteBuilder("POST", "/find-one-post")
	.extract({
		body: DPE.object({
			postId: Post.Id.toExtractParser(),
		}),
	})
	.presetCheck(
		iWantPostExistsById,
		({ body }) => body.postId,
	)
	.handler(
		ResponseContract.ok("post.found", Post.Entity.toEndpointSchema()),
		({ post }, { response }) => response(
			"post.found",
			C.unwrapEntity(post),
		),
	);
