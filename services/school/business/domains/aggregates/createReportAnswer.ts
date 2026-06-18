import { pipe } from "@duplojs/utils";
import { Answer } from "../entities/answer";
import { Report } from "../entities/report";

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

	const updatedAnswer = pipe(
		params.answer,
		Answer.Entity.update({ status: notCompliantAnswerStatus }),
		Answer.NotCompliant.append,
	);

	return {
		report,
		answer: updatedAnswer,
	};
}

