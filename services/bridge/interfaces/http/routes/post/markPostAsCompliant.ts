import { P } from "@duplojs/utils";
import { SchoolProvider } from "@interfaces/providers/school";

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

			const result = await SchoolProvider.markPostAsCompliant({ postId });

			return P.match(result)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "post.wrongStatus" },
					() => new ForbiddenHttpResponse("post.wrongStatus"),
				)
				.with(
					{ information: "post.markAsCompliant" },
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
		() => new OkHttpResponse("post.updated"),
		makeResponseContract(OkHttpResponse, "post.updated"),
	);
