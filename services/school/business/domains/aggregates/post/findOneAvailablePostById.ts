import { E, type C } from "@duplojs/utils";
import type { PostRepository } from "@domains/repositories/post";

export function findOneAvailablePostById(
	input: C.GetEvidenceResult<
		PostRepository["findOneAvailableById"],
		"one-available"
	>,
) {
	return E.right("find-one-available-post-by-id-success", input);
}
