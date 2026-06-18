import type { C } from "@duplojs/utils";
import type { Answer } from "../entities/answer";

export interface AnswerRepository {
	generateId(): Answer.Id & C.Evidence<"generated">;
}
