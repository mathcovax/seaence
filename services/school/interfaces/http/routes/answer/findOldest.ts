import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, C, DPE, E, unwrap } from "@duplojs/utils";
import { Answer } from "@domains/entities/answer";
import { useCases } from "@adapters/useCases";
import { answerPort } from "@adapters/ports";

useRouteBuilder("POST", "/find-oldest-unprocessed-answer")
	.handler(
		[
			ResponseContract.ok("oldestUnprocessedAnswer.found", Answer.Entity.toEndpointSchema()),
			ResponseContract.notFound("oldestUnprocessedAnswer.notfound"),
		],
		(_floor, { response }) => asyncPipe(
			useCases.findOldestUnprocessedAnswer(),
			E.unwrapSelectionOrThrow({
				"find-oldest-unprocessed-answer-success": true,
			}),
			E.matchInformation({
				"none-Answer": () => response("oldestUnprocessedAnswer.notfound"),
				"some-Answer": (answer) => response(
					"oldestUnprocessedAnswer.found",
					C.unwrapEntity(answer),
				),
			}),
		),
	);

useRouteBuilder("POST", "/find-unprocessed-answer-details")
	.handler(
		ResponseContract.ok("unprocessedAnswer.details", DPE.object({ totalCount: DPE.number() })),
		(_floor, { response }) => answerPort
			.getTotalCountOfUnprocessed()
			.then(
				(totalCount) => response("unprocessedAnswer.details", {
					totalCount: unwrap(totalCount),
				}),
			),
	);
