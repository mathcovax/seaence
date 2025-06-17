import { SchoolAPI } from "@interfaces/providers/school";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/posts/{postId}/is-compliant")
	.extract({
		params: {
			postId: zod.string(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const postId = pickup("postId");

			const schoolResponse = await SchoolAPI.indicatePostIsCompliant(postId);

			return match(schoolResponse)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "post.wrongStatus" },
					() => new ForbiddenHttpResponse("post.wrongStatus"),
				)
				.with(
					{ information: "post.updated" },
					() => dropper(null),
				)
				.exhaustive();
		},
		undefined,
		[
			...makeResponseContract(NotFoundHttpResponse, "post.notfound"),
			...makeResponseContract(ForbiddenHttpResponse, "post.wrongStatus"),
		],
	)
	.handler(
		() => new OkHttpResponse(
			"post.updated",
		),
		makeResponseContract(OkHttpResponse, "post.updated"),
	);
