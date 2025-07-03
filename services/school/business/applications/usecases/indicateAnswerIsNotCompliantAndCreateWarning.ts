import { type WarningMakeUserBan, type WarningReason } from "@business/domains/common/warning";
import { type AnswerEntity } from "@business/domains/entities/answer";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { warningRepository } from "../repositories/warning";
import { postRepository } from "../repositories/post";

interface Input {
	answer: AnswerEntity;
	makeUserBan: WarningMakeUserBan;
	reason: WarningReason;
}

export class IndicateAnswerIsNotCompliantAndCreateWarningUsecase extends UsecaseHandler.create({
	answerRepository,
	postRepository,
	warningRepository,
}) {
	public async execute({ answer, makeUserBan, reason }: Input) {
		if (!answer.isUnprocessed()) {
			return new UsecaseError("wrong-status", { answer });
		}

		const postAnswer = await this.postRepository.findOneById(answer.postId);

		if (!postAnswer) {
			return new UsecaseError("answer-post-mismatch", { postId: answer.postId });
		}

		const updatedAnswer = answer.updateStatus("notCompliant");

		await this.answerRepository.save(updatedAnswer);

		await this.warningRepository.createAnswerWarning({
			makeUserBan,
			reason,
			answer,
			post: postAnswer,
		});

		return updatedAnswer;
	}
}
