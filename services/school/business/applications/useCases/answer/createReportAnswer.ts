import { C } from "@duplojs/utils";
import { createReportAnswer } from "@domains/aggregates/createReportAnswer";
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
	({ answerPort, reportPort }) => async(input: Input) => {
		const result = createReportAnswer(input);

		const answer = await answerPort.save(result.answer);
		const report = await reportPort.save(result.report);

		return {
			answer,
			report,
		};
	},
);
