import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";

export class GetTotalCountOfUnprocessedAnswersUsecase extends UsecaseHandler.create({
	answerRepository,
}) {
	public execute() {
		return this.answerRepository.getTotalCountOfUnprocessedAnswers();
	}
}
