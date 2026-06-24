import { E, type C } from "@duplojs/utils";
import type { AnswerRepository } from "@domains/repositories/answer";

export function findOldestUnprocessedAnswer(
	input: C.GetEvidenceResult<
		AnswerRepository["findOldestUnprocessed"],
		"oldest-unprocessed"
	>,
) {
	return E.right("find-oldest-unprocessed-answer-success", input);
}
