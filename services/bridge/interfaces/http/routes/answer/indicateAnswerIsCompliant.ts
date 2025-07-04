import { SchoolAPI } from "@interfaces/providers/school";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/answers/{answerId}/is-compliant")
	.extract({
		params: {
			answerId: zod.string(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const answerId = pickup("answerId");

			const schoolResponse = await SchoolAPI.indicateAnswerIsCompliant(answerId);

			return match(schoolResponse)
				.with(
					{ information: "answer.notfound" },
					() => new NotFoundHttpResponse("answer.notfound"),
				)
				.with(
					{ information: "answer.wrongStatus" },
					() => new ForbiddenHttpResponse("answer.wrongStatus"),
				)
				.with(
					{ information: "answer.updated" },
					() => dropper(null),
				)
				.exhaustive();
		},
		undefined,
		[
			...makeResponseContract(NotFoundHttpResponse, "answer.notfound"),
			...makeResponseContract(ForbiddenHttpResponse, "answer.wrongStatus"),
		],
	)
	.handler(
		() => new OkHttpResponse(
			"answer.updated",
		),
		makeResponseContract(OkHttpResponse, "answer.updated"),
	);
