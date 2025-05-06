import { type PostId } from "@business/domains/entities/post";
import { findPostByIdUsecase } from "@interfaces/usecase";

export const postExistCheck = createChecker("postExist")
	.handler(
		async(input: PostId, output) => {
			const post = await findPostByIdUsecase.execute({ id: input });

			if (post) {
				return output("post.exist", post);
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
