import { type AnswerId } from "@business/domains/entities/answer";
import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";

interface Input {
	id: AnswerId;
}

export class FindAnswerByIdUsecase extends UsecaseHandler.create({
	answerRepository,
}) {
	public execute({ id }: Input) {
		return this.answerRepository.findOneById(id);
	}
}
