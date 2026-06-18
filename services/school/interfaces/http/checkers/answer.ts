import { ResponseContract, createPresetChecker, useCheckerBuilder } from "@duplojs/http";
import { E } from "@duplojs/utils";
import { answerPort } from "@adapters/ports";
import { Answer } from "@domains/entities/answer";

export const answerExistChecker = useCheckerBuilder()
	.handler(
		async(id: Answer.Id, { output }) => {
			const result = await answerPort.findOneById(id);

			if (E.isLeft(result)) {
				return output("answer.notfound", null);
			}

			return output("answer.found", E.unwrapRight(result));
		},
	);

export const iWantAnswerExistsById = createPresetChecker(
	answerExistChecker,
	{
		result: "answer.found",
		indexing: "answer",
		otherwise: ResponseContract.notFound("answer.notfound"),
	},
);

export const answerStatusIsUnprocessedChecker = useCheckerBuilder()
	.handler(
		(answer: Answer.Entity, { output }) => {
			const answerWithStatus = Answer.computeStatus(answer);

			if (Answer.Unprocessed.has(answerWithStatus)) {
				return output("answer.unprocessed", answerWithStatus);
			}

			return output("answer.wrongStatus", null);
		},
	);

export const iWantUnprocessedAnswer = createPresetChecker(
	answerStatusIsUnprocessedChecker,
	{
		result: "answer.unprocessed",
		indexing: "answer",
		otherwise: ResponseContract.forbidden("answer.wrongStatus"),
	},
);
