import { A, D, O, P } from "@duplojs/utils";
import { answerConfig } from "@interfaces/configs/answer";
import { Answer } from "@business/entities/forum/answer";
import { Post } from "@business/entities/forum/post";
import { SchoolProvider } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/answer-list")
	.extract({
		body: {
			postId: Post.id,
			page: zod.number(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { postId, page } = pickup(["postId", "page"]);

			const result = await SchoolProvider.findManyAnswer({
				postId,
				quantityPerPage: answerConfig.findAnswers.quantityPerPage,
				page,
			});

			return P.match(result)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "answers.found" },
					(response) => dropper({ answers: response.body }),
				)
				.exhaustive();
		},
		["answers"],
		makeResponseContract(NotFoundHttpResponse, "post.notfound"),
	)
	.cut(
		({ pickup, dropper }) => {
			const answers = pickup("answers");

			const processedAnswers = answers.map(
				(answer) => answer.status === "notCompliant"
					? {
						...answer,
						content: Answer.notCompliantContent,
					}
					: answer,
			);

			return dropper({ processedAnswers });
		},
		["processedAnswers"],
	)
	.handler(
		(pickup) => {
			// theDate translation
			const processedAnswers = A.map(
				pickup("processedAnswers"),
				O.transformProperty(
					"createdAt",
					D.toISOString,
				),
			);

			return new OkHttpResponse(
				"answerList.found",
				processedAnswers,
			);
		},
		makeResponseContract(OkHttpResponse, "answerList.found", Answer.index.array()),
	);
