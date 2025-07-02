import { type AnswerEntity } from "@business/domains/entities/answer";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";

interface Input {
	answer: AnswerEntity;
}

export class IndicateAnswerIsCompliantUsecase extends UsecaseHandler.create({
	answerRepository,
}) {
	public execute({ answer }: Input) {
		if (!answer.isUnprocessed()) {
			return new UsecaseError("wrong-status", { answer });
		}

		const updatedAnswer = answer.updateStatus("compliant");

		return this.answerRepository.save(updatedAnswer);
	}
}
