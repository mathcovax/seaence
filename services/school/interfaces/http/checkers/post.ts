import { ResponseContract, createPresetChecker, useCheckerBuilder } from "@duplojs/http";
import { E } from "@duplojs/utils";
import { postPort } from "@adapters/ports";
import { Post } from "@domains/entities/post";

export const postExistChecker = useCheckerBuilder()
	.handler(
		async(id: Post.Id, { output }) => {
			const result = await postPort.findOneById(id);

			if (E.isLeft(result)) {
				return output("post.notfound", null);
			}

			return output("post.found", E.unwrapRight(result));
		},
	);

export const postStatusIsUnprocessedChecker = useCheckerBuilder()
	.handler(
		(post: Post.Entity, { output }) => {
			const postWithStatus = Post.computeStatus(post);

			if (Post.Unprocessed.has(postWithStatus)) {
				return output("post.unprocessed", postWithStatus);
			}

			return output("post.wrongStatus", null);
		},
	);

export const iWantPostExistsById = createPresetChecker(
	postExistChecker,
	{
		result: "post.found",
		indexing: "post",
		otherwise: ResponseContract.notFound("post.notfound"),
	},
);

export const iWantUnprocessedPost = createPresetChecker(
	postStatusIsUnprocessedChecker,
	{
		result: "post.unprocessed",
		indexing: "post",
		otherwise: ResponseContract.forbidden("post.wrongStatus"),
	},
);
