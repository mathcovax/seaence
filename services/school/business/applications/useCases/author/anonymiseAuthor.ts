import { C } from "@duplojs/utils";
import { anonymiseAuthor } from "@domains/aggregates/author/anonymiseAuthor";
import { AuthorPort } from "@applications/ports/author";
import type { UserId } from "@domains/common/user";

interface Input {
	userId: UserId;
}

export const AnonymiseAuthorUseCase = C.createUseCase(
	{ AuthorPort },
	({ authorPort }) => async(input: Input) => anonymiseAuthor(
		await authorPort.anonymise(input.userId),
	),
);
