import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE, unwrap } from "@duplojs/utils";
import { postPort } from "@adapters/ports";

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
