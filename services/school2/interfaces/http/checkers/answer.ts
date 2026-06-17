import { ResponseContract, createPresetChecker, useCheckerBuilder } from "@duplojs/http";
import { E, pipe } from "@duplojs/utils";
import { answerPort } from "@adapters/ports";
import { Answer } from "@domains/entities/answer";

export const answerExistChecker = useCheckerBuilder()
	.handler(
		async(id: Answer.Id, { output }) => {
			const result = await answerPort.findOneById(id);

			if (E.isLeft(result)) {
				return output("answer.notfound", null);
			}

			return pipe(
				E.unwrapRight(result),
				Answer.computeStatus,
				(answer) => output("answer.found", answer),
			);
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
		(answer: Answer.EntityWithStatus, { output }) => {
			if (Answer.Unprocessed.has(answer)) {
				return output("answer.unprocessed", answer);
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
