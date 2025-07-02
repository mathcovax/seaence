import { Page } from "@business/entities/page";
import { SchoolAPI } from "@interfaces/providers/school";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/answer-moderation-page")
	.cut(
		async({ dropper }) => {
			const schoolResponse = await SchoolAPI.findOldestUnprocessedAnswer();

			return match(schoolResponse)
				.with(
					{ information: "oldestUnprocessedAnswer.notfound" },
					() => new NotFoundHttpResponse("answerModerationPage.notfound"),
				)
				.with(
					{ information: "oldestUnprocessedAnswer.found" },
					({ body }) => dropper({ answer: body }),
				)
				.exhaustive();
		},
		["answer"],
		makeResponseContract(NotFoundHttpResponse, "answerModerationPage.notfound"),
	)
	.cut(
		async({ dropper }) => {
			const schoolResponse = await SchoolAPI.getUnprocessedAnswerDetails();

			return match(schoolResponse)
				.with(
					{ information: "unprocessedAnswer.details" },
					({ body }) => dropper({
						details: {
							...body,
						},
					}),
				)
				.exhaustive();
		},
		["details"],
	)
	.handler(
		(pickup) => {
			const { details, answer } = pickup(["details", "answer"]);

			return new OkHttpResponse(
				"answerModerationPage.found",
				{
					answer,
					unprocessedTotalCount: details.totalCount,
				},
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"answerModerationPage.found",
			Page.moderationAnswer,
		),
	);
