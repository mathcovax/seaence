import { O, P } from "@duplojs/utils";
import { SchoolProvider } from "@interfaces/providers/school";
import { baseWarningRules } from "@vendors/entity-rules";

useBuilder()
	.createRoute("POST", "/posts/{postId}/is-not-compliant-and-create-warning")
	.extract({
		params: {
			postId: zod.string(),
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
				postId,
			} = pickup(["body", "postId"]);

			const schoolResponse = await SchoolProvider.createReportPost({
				postId,
				level: makeUserBan ? "ban" : "warning",
				reason,
			});

			return P.match(schoolResponse)
				.when(
					O.discriminate(
						"information",
						["post.notfound", "post.unprocessed.wrongStatus"],
					),
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.when(
					O.discriminate("information", "report.created"),
					() => dropper(null),
				)
				.exhaustive();
		},
		undefined,
		makeResponseContract(NotFoundHttpResponse, "post.notfound"),
	)
	.handler(
		() => new OkHttpResponse("post.updated"),
		makeResponseContract(OkHttpResponse, "post.updated"),
	);
