import { P } from "@duplojs/utils";
import { SchoolProvider } from "@interfaces/providers/school";
import { baseWarningRules } from "@vendors/entity-rules";

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

			const schoolResponse = await SchoolProvider.createReportAnswer({
				answerId,
				level: makeUserBan ? "ban" : "warning",
				reason,
			});

			return P.match(schoolResponse)
				.with(
					{ information: "answer.notfound" },
					() => new NotFoundHttpResponse("answer.notfound"),
				)
				.with(
					{ information: "report.created" },
					() => dropper(null),
				)
				.exhaustive();
		},
		undefined,
		[
			...makeResponseContract(ForbiddenHttpResponse, "answer.wrongStatus"),
			...makeResponseContract(NotFoundHttpResponse, "answer.notfound"),
		],
	)
	.handler(
		() => new OkHttpResponse("answer.updated"),
		makeResponseContract(OkHttpResponse, "answer.updated"),
	);
