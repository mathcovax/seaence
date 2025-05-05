import { SchoolAPI } from "@interfaces/providers/school";

export const postExistCheck = createChecker("postExist")
	.handler(
		async(input: string, output) => {
			const schoolResponse = await SchoolAPI.findPost(input);

			if (schoolResponse.information === "post.found") {
				return output("post.exist", schoolResponse.body);
			} else {
				return output("post.notfound", null);
			}
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
