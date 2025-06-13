import { SchoolAPI } from "@interfaces/providers/school";
import { match } from "ts-pattern";

export const postExistCheck = createChecker("postExist")
	.handler(
		async(input: string, output) => {
			const schoolResponse = await SchoolAPI.findPostById(input);

			return match(schoolResponse)
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
