import { C, E, promiseObject } from "@duplojs/utils";
import { createReportAnswer } from "@domains/aggregates/answer/createReportAnswer";
import { AnswerPort } from "@applications/ports/answer";
import { ReportPort } from "@applications/ports/report";
import type { Answer } from "@domains/entities/answer";
import type { Report } from "@domains/entities/report";

interface Input {
	answer: Answer.Entity & Answer.Unprocessed;
	level: Report.Level;
	reason: Report.Reason;
}

export const CreateReportAnswerUseCase = C.createUseCase(
	{
		AnswerPort,
		ReportPort,
	},
	({ answerPort, reportPort }) => (input: Input) => E.rightAsyncPipe(
		createReportAnswer(input),
		({ answer, report }) => promiseObject({
			report: reportPort.save(report),
			answer: answerPort.save(answer),
		}),
		(result) => E.right("post.report", result),
	),
);
