import { type WarningMakeUserBan, type WarningReason } from "@business/domains/common/warning";
import { type AnswerEntity } from "@business/domains/entities/answer";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { warningRepository } from "../repositories/warning";
import { type PostEntity } from "@business/domains/entities/post";

interface Input {
	answer: AnswerEntity;
	post: PostEntity;
	makeUserBan: WarningMakeUserBan;
	reason: WarningReason;
}

export class IndicateAnswerIsNotCompliantAndCreateWarningUsecase extends UsecaseHandler.create({
	answerRepository,
	warningRepository,
}) {
	public async execute({ answer, post, makeUserBan, reason }: Input) {
		if (!answer.isUnprocessed()) {
			return new UsecaseError("wrong-status", { answer });
		}

		const updatedAnswer = answer.updateStatus("notCompliant");

		await this.answerRepository.save(updatedAnswer);

		await this.warningRepository.createAnswerWarning({
			makeUserBan,
			reason,
			answer,
			post,
		});

		return updatedAnswer;
	}
}
