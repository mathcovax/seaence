import { E, type C } from "@duplojs/utils";
import type { PostRepository } from "@domains/repositories/post";

export function findManyAvailablePostByNodeSameRawDocument(
	input: C.GetEvidenceResult<
		PostRepository["findManyAvailableByNodeSameRawDocument"],
		"many-available"
	>,
) {
	return E.right("find-many-available-post-by-node-same-raw-document-success", input);
}
