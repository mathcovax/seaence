import { Answer } from "@domains/entities/answer";
import { Report } from "@domains/entities/report";

interface CreateReportAnswerParams {
	answer: Answer.Entity & Answer.Unprocessed;
	level: Report.Level;
	reason: Report.Reason;
}

const notCompliantAnswerStatus = Answer.Status.createOrThrow("notCompliant");

export function createReportAnswer(params: CreateReportAnswerParams) {
	return {
		report: Report.Entity.new({
			answerId: params.answer.id,
			postId: params.answer.postId,
			userId: params.answer.authorId,
			level: params.level,
			reason: params.reason,
		}),
		answer: Answer.Entity.update(
			params.answer,
			{ status: notCompliantAnswerStatus },
		),
	};
}

