import { C } from "@duplojs/utils";
import { AnswerPort } from "@applications/ports/answer";
import { findOldestUnprocessedAnswer } from "@domains/aggregates/answer/findOldestUnprocessedAnswer";

export const FindOldestUnprocessedAnswer = C.createUseCase(
	{ AnswerPort },
	({ answerPort }) => async() => findOldestUnprocessedAnswer(
		await answerPort.findOldestUnprocessed(),
	),
);
