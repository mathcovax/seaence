import { C } from "@duplojs/utils";
import { renameAuthor } from "@domains/aggregates/author/renameAuthor";
import { AuthorPort } from "@applications/ports/author";
import type { UserId, UserName } from "@domains/common/user";

interface Input {
	userId: UserId;
	username: UserName;
}

export const RenameAuthorUseCase = C.createUseCase(
	{ AuthorPort },
	({ authorPort }) => async(input: Input) => renameAuthor(
		await authorPort.rename(input.userId, input.username),
	),
);
