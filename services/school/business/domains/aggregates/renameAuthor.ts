import type { AuthorRepository } from "@domains/repositories/author";
import { E, type C } from "@duplojs/utils";

export function renameAuthor(_input: C.GetEvidenceResult<AuthorRepository["rename"], "rename">) {
	return E.right("rename-author-success");
}
