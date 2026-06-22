import { E, pipe } from "@duplojs/utils";
import { Post } from "@domains/entities/post";

const compliantStatus = Post.Status.createOrThrow("compliant");

export function markPostAsCompliant(post: Post.Entity & Post.Unprocessed) {
	return pipe(
		post,
		Post.Entity.update({ status: compliantStatus }),
		Post.computeStatus,
		E.whenHasInformationOtherwise(
			"post.compliant",
			(answer) => E.right("post.compliant", answer),
			(result) => E.left("post.compliant.wrongStatus", result),
		),
	);
}
