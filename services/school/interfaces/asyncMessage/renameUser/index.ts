import { userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { renameAuthor } from "@interfaces/usecase";
import { logger } from "@vendors/backend-logger/logger";

asyncMessage.collections.renameUser.on(
	async(renameUserPayload) => {
		logger("rename user", renameUserPayload);

		const authorId = userIdObjecter.unsafeCreate(renameUserPayload.value.userId);
		const newAuthorName = usernameObjecter.unsafeCreate(renameUserPayload.value.newName);

		await renameAuthor.execute({
			authorId,
			newAuthorName,
		});
	},
);

await asyncMessage
	.collections
	.renameUser
	.start(true);
