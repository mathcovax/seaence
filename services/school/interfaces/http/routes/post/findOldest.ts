import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, C, DPE, E, unwrap } from "@duplojs/utils";
import { postPort } from "@adapters/ports";
import { Post } from "@domains/entities/post";
import { useCases } from "@adapters/useCases";

useRouteBuilder("POST", "/find-oldest-unprocessed-post")
	.handler(
		[
			ResponseContract.ok("oldestUnprocessedPost.found", Post.Entity.toEndpointSchema()),
			ResponseContract.notFound("oldestUnprocessedPost.notfound"),
		],
		(_floor, { response }) => asyncPipe(
			useCases.findOldestUnprocessedPost(),
			E.unwrapSelectionOrThrow({
				"find-oldest-unprocessed-post-success": true,
			}),
			E.matchInformation({
				"none-Post": () => response("oldestUnprocessedPost.notfound"),
				"some-Post": (post) => response(
					"oldestUnprocessedPost.found",
					C.unwrapEntity(post),
				),
			}),
		),
	);

useRouteBuilder("POST", "/find-unprocessed-post-details")
	.handler(
		ResponseContract.ok("unprocessedPost.details", DPE.object({ totalCount: DPE.number() })),
		(_floor, { response }) => postPort
			.getTotalCountOfUnprocessed()
			.then(
				(totalCount) => response("unprocessedPost.details", {
					totalCount: unwrap(totalCount),
				}),
			),
	);
