import { Page } from "@business/entities/page";
import { D, O, P } from "@duplojs/utils";
import { SchoolProvider } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/answer-moderation-page")
	.cut(
		async({ dropper }) => {
			const schoolResponse = await SchoolProvider.findOldestUnprocessedAnswer();

			return P.match(schoolResponse)
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
			const schoolResponse = await SchoolProvider.getUnprocessedAnswerDetails();

			return P.match(schoolResponse)
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
			const floorFragment = pickup(["details", "answer"]);

			// theDate translation
			const answer = O.transformProperty(
				floorFragment.answer,
				"createdAt",
				D.toISOString,
			);

			return new OkHttpResponse(
				"answerModerationPage.found",
				{
					answer,
					unprocessedTotalCount: floorFragment.details.totalCount,
				},
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"answerModerationPage.found",
			Page.moderationAnswer,
		),
	);
