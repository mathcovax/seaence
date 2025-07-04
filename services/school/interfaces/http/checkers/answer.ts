import { type AnswerId } from "@business/domains/entities/answer";
import { findAnswerByIdUsecase } from "@interfaces/usecase";

export const answerExistCheck = createChecker("answerExist")
	.handler(
		async(input: AnswerId, output) => {
			const answer = await findAnswerByIdUsecase.execute({ id: input });

			if (answer) {
				return output("answer.exist", answer);
			} else {
				return output("answer.notfound", null);
			}
		},
	);

export const iWantAnswerExistById = createPresetChecker(
	answerExistCheck,
	{
		result: "answer.exist",
		catch: () => new NotFoundHttpResponse("answer.notfound"),
		indexing: "answer",
	},
	makeResponseContract(NotFoundHttpResponse, "answer.notfound"),
);
