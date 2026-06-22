import { O, P } from "@duplojs/utils";
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
				.when(
					O.discriminate(
						"information",
						["post.notfound", "post.unprocessed.wrongStatus"],
					),
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.when(
					O.discriminate("information", "post.markAsCompliant"),
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
