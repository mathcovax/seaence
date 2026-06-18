import { C } from "@duplojs/utils";
import { restoreAuthor } from "@domains/aggregates/restoreAuthor";
import { AuthorPort } from "@applications/ports/author";
import type { UserId, UserName } from "@domains/common/user";

interface Input {
	userId: UserId;
	username: UserName;
}

export const RestoreAuthorUseCase = C.createUseCase(
	{ AuthorPort },
	({ authorPort }) => async(input: Input) => restoreAuthor(
		await authorPort.restore(input.userId, input.username),
	),
);
