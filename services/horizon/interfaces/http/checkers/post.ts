import { SchoolProvider } from "@interfaces/providers/school";

export const postExistCheck = createChecker("postExist")
	.handler(
		async(postId: string, output) => {
			const schoolResponse = await SchoolProvider.findOnePost({ postId });

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
