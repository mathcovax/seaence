import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE, unwrap } from "@duplojs/utils";
import { answerPort } from "@adapters/ports";

const detailsSchema = DPE.object({
	totalCount: DPE.number(),
});

useRouteBuilder("POST", "/find-unprocessed-answer-details")
	.handler(
		ResponseContract.ok("unprocessedAnswer.details", detailsSchema),
		(_floor, { response }) => answerPort
			.getTotalCountOfUnprocessed()
			.then(
				(totalCount) => response("unprocessedAnswer.details", {
					totalCount: unwrap(totalCount),
				}),
			),
	);
