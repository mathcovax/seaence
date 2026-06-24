import { E, type C } from "@duplojs/utils";
import type { AnswerRepository } from "@domains/repositories/answer";

export function findManyAvailableAnswerByAvailablePost(
	input: C.GetEvidenceResult<
		AnswerRepository["findManyAvailableByAvailablePost"],
		"many-available"
	>,
) {
	return E.right("find-many-available-answer-by-available-post-success", input);
}
