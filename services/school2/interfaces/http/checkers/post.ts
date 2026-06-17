import { ResponseContract, createPresetChecker, useCheckerBuilder } from "@duplojs/http";
import { E, pipe } from "@duplojs/utils";
import { postPort } from "@adapters/ports";
import { Post } from "@domains/entities/post";

export const postExistChecker = useCheckerBuilder()
	.handler(
		async(id: Post.Id, { output }) => {
			const result = await postPort.findOneById(id);

			if (E.isLeft(result)) {
				return output("post.notfound", null);
			}

			return pipe(
				E.unwrapRight(result),
				Post.computeStatus,
				(post) => output("post.found", post),
			);
		},
	);

export const postStatusIsUnprocessedChecker = useCheckerBuilder()
	.handler(
		(post: Post.EntityWithStatus, { output }) => {
			if (Post.Unprocessed.has(post)) {
				return output("post.unprocessed", post);
			}

			return output("post.wrongStatus", null);
		},
	);

export const postStatusIsCompliantChecker = useCheckerBuilder()
	.handler(
		(post: Post.EntityWithStatus, { output }) => {
			if (Post.Compliant.has(post)) {
				return output("post.compliant", post);
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

export const iWantCompliantPost = createPresetChecker(
	postStatusIsCompliantChecker,
	{
		result: "post.compliant",
		indexing: "post",
		otherwise: ResponseContract.forbidden("post.wrongStatus"),
	},
);
