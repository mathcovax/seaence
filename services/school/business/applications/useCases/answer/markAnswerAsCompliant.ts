import { C, E } from "@duplojs/utils";
import { markAnswerAsCompliant } from "@domains/aggregates/answer/markAnswerAsCompliant";
import { AnswerPort } from "@applications/ports/answer";
import type { Answer } from "@domains/entities/answer";

interface Input {
	answer: Answer.Entity & Answer.Unprocessed;
}

export const MarkAnswerAsCompliantUseCase = C.createUseCase(
	{ AnswerPort },
	({ answerPort }) => (input: Input) => E.rightPipe(
		markAnswerAsCompliant(input.answer),
		answerPort.save,
	),
);
