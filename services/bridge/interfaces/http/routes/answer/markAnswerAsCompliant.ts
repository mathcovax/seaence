import { O, P } from "@duplojs/utils";
import { SchoolProvider } from "@interfaces/providers/school";

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

			const schoolResponse = await SchoolProvider.markAnswerAsCompliant({ answerId });

			return P.match(schoolResponse)
				.when(
					O.discriminate(
						"information",
						["answer.notfound", "answer.unprocessed.wrongStatus"],
					),
					() => new NotFoundHttpResponse("answer.notfound"),
				)
				.when(
					O.discriminate("information", "answer.markedAsCompliant"),
					() => dropper(null),
				)
				.exhaustive();
		},
		undefined,
		makeResponseContract(NotFoundHttpResponse, "answer.notfound"),
	)
	.handler(
		() => new OkHttpResponse(
			"answer.updated",
		),
		makeResponseContract(OkHttpResponse, "answer.updated"),
	);
