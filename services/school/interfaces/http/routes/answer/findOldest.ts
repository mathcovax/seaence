import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C, E, innerPipe } from "@duplojs/utils";
import { answerPort } from "@adapters/ports";
import { Answer } from "@domains/entities/answer";

useRouteBuilder("POST", "/find-oldest-unprocessed-answer")
	.handler(
		[
			ResponseContract.ok("oldestUnprocessedAnswer.found", Answer.Entity.toEndpointSchema()),
			ResponseContract.notFound("oldestUnprocessedAnswer.notfound"),
		],
		(_floor, { response }) => answerPort
			.findOldestUnprocessed()
			.then(
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
	);
