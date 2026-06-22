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

export const computeStatusAnswerChecker = useCheckerBuilder()
	.handler(
		(answer: Answer.Entity, { output }) => E.matchInformation(
			Answer.computeStatus(answer),
			{
				"answer.compliant": (answer) => output("answer.compliant", answer),
				"answer.notCompliant": (answer) => output("answer.notCompliant", answer),
				"answer.unprocessed": (answer) => output("answer.unprocessed", answer),
			},
		),
	);

export const iWantAnswerWithUnprocessedStatus = createPresetChecker(
	computeStatusAnswerChecker,
	{
		result: "answer.unprocessed",
		otherwise: ResponseContract.notFound("answer.unprocessed.wrongStatus"),
		indexing: "answer",
	},
);
