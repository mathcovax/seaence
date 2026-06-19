import { C } from "@duplojs/utils";
import { markAnswerAsCompliant } from "@domains/aggregates/answer/markAnswerAsCompliant";
import { AnswerPort } from "@applications/ports/answer";
import type { Answer } from "@domains/entities/answer";

interface Input {
	answer: Answer.Entity & Answer.Unprocessed;
}

export const MarkAnswerAsCompliantUseCase = C.createUseCase(
	{ AnswerPort },
	({ answerPort }) => (input: Input) => answerPort.save(
		markAnswerAsCompliant(input.answer),
	),
);
