import { E, pipe } from "@duplojs/utils";
import { Answer } from "@domains/entities/answer";
import { Report } from "@domains/entities/report";

interface CreateReportAnswerParams {
	answer: Answer.Entity & Answer.Unprocessed;
	level: Report.Level;
	reason: Report.Reason;
}

const notCompliantAnswerStatus = Answer.Status.createOrThrow("notCompliant");

export function createReportAnswer(params: CreateReportAnswerParams) {
	const report = Report.Entity.new({
		answerId: params.answer.id,
		postId: params.answer.postId,
		userId: params.answer.authorId,
		level: params.level,
		reason: params.reason,
	});

	return pipe(
		params.answer,
		Answer.Entity.update({ status: notCompliantAnswerStatus }),
		Answer.computeStatus,
		E.whenHasInformationOtherwise(
			"answer.notCompliant",
			(answer) => E.right("answer.report", {
				answer,
				report,
			}),
			(result) => E.left("answer.report.wrongStatus", result),
		),
	);
}

