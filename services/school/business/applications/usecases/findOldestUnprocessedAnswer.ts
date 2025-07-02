import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";

export class FindOldestUnprocessedAnswerUsecase extends UsecaseHandler.create({
	answerRepository,
}) {
	public execute() {
		return this.answerRepository.findOldestUnprocessedAnswer();
	}
}
