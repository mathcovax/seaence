import { pipe } from "@duplojs/utils";
import { Post } from "@domains/entities/post";

const compliantStatus = Post.Status.createOrThrow("compliant");

export function markPostAsCompliant(post: Post.Entity & Post.Unprocessed) {
	return pipe(
		post,
		Post.Entity.update({ status: compliantStatus }),
		Post.Compliant.append,
	);
}
