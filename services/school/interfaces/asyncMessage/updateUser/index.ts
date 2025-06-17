import { userIdObjecter, usernameObjecter } from "@business/domains/common/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { renameAuthor } from "@interfaces/usecase";

asyncMessage.collections.updateUser.on(
	async(updateUserPayload) => {
		if (!updateUserPayload.value.updatedFields.includes("username")) {
			return;
		}
		const authorId = userIdObjecter.unsafeCreate(updateUserPayload.value.id);
		const newAuthorName = usernameObjecter.unsafeCreate(updateUserPayload.value.username);

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
