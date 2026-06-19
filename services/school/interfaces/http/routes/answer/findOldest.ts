import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C, DPE, E, innerPipe, unwrap } from "@duplojs/utils";
import { Answer } from "@domains/entities/answer";
import { useCases } from "@adapters/useCases";
import { answerPort } from "@adapters/ports";

useRouteBuilder("POST", "/find-oldest-unprocessed-answer")
	.handler(
		[
			ResponseContract.ok("oldestUnprocessedAnswer.found", Answer.Entity.toEndpointSchema()),
			ResponseContract.notFound("oldestUnprocessedAnswer.notfound"),
		],
		(_floor, { response }) => useCases
			.findOldestUnprocessedAnswer()
			.then(
				E.whenHasInformation(
					"find-oldest-unprocessed-answer-success",
					innerPipe(
						E.whenIsLeft(
							() => response("oldestUnprocessedAnswer.notfound"),
						),
						E.whenIsRight(
							(answer) => response(
								"oldestUnprocessedAnswer.found",
								C.unwrapEntity(answer),
							),
						),
					),
				),
			),
	);

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
