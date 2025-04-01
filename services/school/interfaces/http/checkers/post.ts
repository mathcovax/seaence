import { postRepository } from "@business/applications/repositories/post";
import { type PostId } from "@business/domains/entities/post";

export const postExistCheck = createChecker("postExist")
	.handler(
		async(input: PostId, output) => {
			const post = await postRepository.use.findOneById(input);

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
);
