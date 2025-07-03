import { SchoolAPI } from "@interfaces/providers/school";
import { baseWarningRules } from "@vendors/entity-rules";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/answers/{answerId}/is-not-compliant-and-create-warning")
	.extract({
		params: {
			answerId: zod.string(),
		},
		body: zod.object({
			makeUserBan: zod.boolean(),
			reason: zod.string()
				.min(baseWarningRules.reason.min)
				.max(baseWarningRules.reason.max),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const {
				body: {
					makeUserBan,
					reason,
				},
				answerId,
			} = pickup(["body", "answerId"]);

			const schoolResponse = await SchoolAPI.indicateAnswerIsNotCompliantAndCreateWarning({
				answerId,
				makeUserBan,
				reason,
			});

			return match(schoolResponse)
				.with(
					{ information: "answer.wrongStatus" },
					() => new ForbiddenHttpResponse("answer.wrongStatus"),
				)
				.with(
					{ information: "answer.notfound" },
					() => new NotFoundHttpResponse("answer.notfound"),
				)
				.with(
					{ information: "answer.postMismatch" },
					() => new NotFoundHttpResponse("answer.postMismatch"),
				)
				.with(
					{ information: "answer.updated" },
					() => dropper(null),
				)
				.exhaustive();
		},
		undefined,
		[
			...makeResponseContract(ForbiddenHttpResponse, "answer.wrongStatus"),
			...makeResponseContract(NotFoundHttpResponse, "answer.postMismatch"),
			...makeResponseContract(NotFoundHttpResponse, "answer.notfound"),
		],
	)
	.handler(
		() => new OkHttpResponse("answer.updated"),
		makeResponseContract(OkHttpResponse, "answer.updated"),
	);
