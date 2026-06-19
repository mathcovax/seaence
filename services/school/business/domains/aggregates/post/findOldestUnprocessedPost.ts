import { E, type C } from "@duplojs/utils";
import type { PostRepository } from "@domains/repositories/post";

export function findOldestUnprocessedPost(
	input: C.GetEvidenceResult<
		PostRepository["findOldestUnprocessed"],
		"oldest-unprocessed"
	>,
) {
	return E.right("find-oldest-unprocessed-post-success", input);
}
