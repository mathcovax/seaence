import type { AuthorRepository } from "@domains/repositories/author";
import { E, type C } from "@duplojs/utils";

export function anonymiseAuthor(
	_input: C.GetEvidenceResult<
		AuthorRepository["anonymise"],
		"anonymise"
	>,
) {
	return E.right("anonymise-author-success");
}
