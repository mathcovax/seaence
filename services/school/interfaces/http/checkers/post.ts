import { ResponseContract, createPresetChecker, useCheckerBuilder } from "@duplojs/http";
import { E, P } from "@duplojs/utils";
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

export const iWantPostExistsById = createPresetChecker(
	postExistChecker,
	{
		result: "post.found",
		indexing: "post",
		otherwise: ResponseContract.notFound("post.notfound"),
	},
);

export const computePostStatusChecker = useCheckerBuilder()
	.handler(
		(post: Post.Entity, { output }) => P.match(
			Post.computeStatus(post),
		)
			.when(
				Post.Unprocessed.has,
				(post) => output("post.unprocessed", post),
			)
			.when(
				Post.Compliant.has,
				(post) => output("post.compliant", post),
			)
			.when(
				Post.NotCompliant.has,
				(post) => output("post.notCompliant", post),
			)
			.exhaustive(),
	);

export const iWantPostWithAvailableStatus = createPresetChecker(
	computePostStatusChecker,
	{
		result: ["post.unprocessed", "post.compliant"],
		otherwise: ResponseContract.notFound("post.notfound"),
		indexing: "post",
	},
);

export const iWantPostWithUnprocessedStatus = createPresetChecker(
	computePostStatusChecker,
	{
		result: "post.unprocessed",
		otherwise: ResponseContract.notFound("post.notfound"),
		indexing: "post",
	},
);

