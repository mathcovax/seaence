import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE } from "@duplojs/utils";
import { useCases } from "@adapters/useCases";
import { Answer } from "@domains/entities/answer";
import { Report } from "@domains/entities/report";
import { iWantAnswerExistsById, iWantUnprocessedAnswer } from "@http/checkers";

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
		iWantUnprocessedAnswer,
		({ answer }) => answer,
	)
	.handler(
		ResponseContract.created("report.created"),
		({ body, answer }, { response }) => useCases
			.createReportAnswerUseCase({
				answer,
				level: body.level,
				reason: body.reason,
			})
			.then(
				() => response("report.created"),
			),
	);
