import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, DPE, E } from "@duplojs/utils";
import { useCases } from "@adapters/useCases";
import { Answer } from "@domains/entities/answer";
import { Report } from "@domains/entities/report";
import { iWantAnswerExistsById, iWantAnswerWithUnprocessedStatus } from "@http/checkers";

useRouteBuilder("POST", "/create-report-answer")
	.extract({
		body: DPE.object({
			answerId: Answer.Id.toExtractParser(),
			level: Report.Level.toExtractParser(),
			reason: Report.Reason.toExtractParser(),
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
		ResponseContract.created("report.created"),
		({ body, answer }, { response }) => asyncPipe(
			useCases.createReportAnswerUseCase({
				answer,
				level: body.level,
				reason: body.reason,
			}),
			E.unwrapSelectionOrThrow({
				"answer.report.wrongStatus": false,
				"post.report": true,
			}),
			() => response("report.created"),
		),
	);
