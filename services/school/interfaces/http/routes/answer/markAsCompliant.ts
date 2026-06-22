import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, DPE, E } from "@duplojs/utils";
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
		({ answer }, { response }) => asyncPipe(
			useCases.markAnswerAsCompliantUseCase({ answer }),
			E.unwrapSelectionOrThrow({
				success: true,
				"answer.compliant.wrongStatus": false,
			}),
			() => response("answer.markedAsCompliant"),
		),
	);
