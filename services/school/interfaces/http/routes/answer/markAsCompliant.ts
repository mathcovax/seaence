import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE } from "@duplojs/utils";
import { useCases } from "@adapters/useCases";
import { Answer } from "@domains/entities/answer";
import { iWantAnswerExistsById, iWantAnswerWithUnprocessedStatus } from "@http/checkers";

useRouteBuilder("POST", "/mark-answer-as-compliant")
	.extract({
		body: DPE.object({
			answerId: Answer.Id.toExtractParser(),
		}),
	})
	.presetCheck(
		iWantAnswerExistsById,
		({ body }) => body.answerId,
	)
	.presetCheck(
		iWantAnswerWithUnprocessedStatus,
		(floor) => floor.answer,
	)
	.handler(
		ResponseContract.noContent("answer.markedAsCompliant"),
		({ answer }, { response }) => useCases
			.markAnswerAsCompliantUseCase({ answer })
			.then(
				() => response("answer.markedAsCompliant"),
			),
	);
