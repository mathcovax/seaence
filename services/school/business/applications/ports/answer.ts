import { C } from "@duplojs/utils";
import type { AnswerRepository } from "@domains/repositories/answer";
import type { BaseRepositoryPort } from "./types";
import type { Answer } from "@domains/entities/answer";

export interface AnswerPort extends AnswerRepository, BaseRepositoryPort<Answer.Entity> {
	findOneById(id: Answer.Id): Promise<C.Maybe<Answer.Entity>>;
	getTotalCountOfUnprocessed(): Promise<C.PositiveInt>;
}

export const AnswerPort = C.createPort<AnswerPort>();
