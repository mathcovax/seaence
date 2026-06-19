import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C, DPE, E, innerPipe, unwrap } from "@duplojs/utils";
import { postPort } from "@adapters/ports";
import { Post } from "@domains/entities/post";
import { useCases } from "@adapters/useCases";

useRouteBuilder("POST", "/find-oldest-unprocessed-post")
	.handler(
		[
			ResponseContract.ok("oldestUnprocessedPost.found", Post.Entity.toEndpointSchema()),
			ResponseContract.notFound("oldestUnprocessedPost.notfound"),
		],
		(_floor, { response }) => useCases
			.findOldestUnprocessedPost()
			.then(
				E.whenHasInformation(
					"find-oldest-unprocessed-post-success",
					innerPipe(
						E.whenIsLeft(
							() => response("oldestUnprocessedPost.notfound"),
						),
						E.whenIsRight(
							(post) => response(
								"oldestUnprocessedPost.found",
								C.unwrapEntity(post),
							),
						),
					),
				),
			),
	);

const detailsSchema = DPE.object({
	totalCount: DPE.number(),
});

useRouteBuilder("POST", "/find-unprocessed-post-details")
	.handler(
		ResponseContract.ok("unprocessedPost.details", detailsSchema),
		(_floor, { response }) => postPort
			.getTotalCountOfUnprocessed()
			.then(
				(totalCount) => response("unprocessedPost.details", {
					totalCount: unwrap(totalCount),
				}),
			),
	);
