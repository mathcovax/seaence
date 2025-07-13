import { userIdObjecter, usernameObjecter } from "@business/domains/common/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { renameAuthor } from "@interfaces/usecase";

asyncMessage.collections.updateUser.on(
	async({ value }) => {
		const username = value.username;
		if (!username) {
			return;
		}
		const authorId = userIdObjecter.unsafeCreate(value.userId);
		const newAuthorName = usernameObjecter.unsafeCreate(username);

		await renameAuthor.execute({
			authorId,
			newAuthorName,
		});
	},
);

await asyncMessage
	.collections
	.updateUser
	.start(true);
