import { P } from "@duplojs/utils";
import { SchoolProvider } from "@interfaces/providers/school";

export const postExistCheck = createChecker("postExist")
	.handler(
		async(postId: string, output) => {
			const schoolResponse = await SchoolProvider.findOnePost({ postId });

			return P.match(schoolResponse)
				.with(
					{ information: "post.found" },
					({ body }) => output("post.exist", body),
				)
				.with(
					{ information: "post.notfound" },
					() => output("post.notfound", null),
				)
				.exhaustive();
		},
	);

export const iWantPostExistById = createPresetChecker(
	postExistCheck,
	{
		result: "post.exist",
		catch: () => new NotFoundHttpResponse("post.notfound"),
		indexing: "post",
	},
	makeResponseContract(NotFoundHttpResponse, "post.notfound"),
);
