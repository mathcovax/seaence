import { pipe } from "@duplojs/utils";
import { Answer } from "../../entities/answer";

const compliantStatus = Answer.Status.createOrThrow("compliant");

export function markAnswerAsCompliant(answer: Answer.Entity & Answer.Unprocessed) {
	return pipe(
		answer,
		Answer.Entity.update({ status: compliantStatus }),
		Answer.Compliant.append,
	);
}
