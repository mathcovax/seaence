import type { AuthorRepository } from "@domains/repositories/author";
import { E, type C } from "@duplojs/utils";

export function restoreAuthor(
	_input: C.GetEvidenceResult<
		AuthorRepository["restore"],
		"restore"
	>,
) {
	return E.right("restore-author-success");
}
