import { asyncMessage } from "@providers/asyncMessage";
import { useCases } from "@adapters/useCases";
import { UserId, UserName } from "@domains/common/user";

asyncMessage.collections.updateUser.on(
	async({ value }) => {
		if (!value.username) {
			return;
		}
		const userId = UserId.createOrThrow(value.userId);
		const username = UserName.createOrThrow(value.username);

		await useCases.renameAuthorUseCase({
			userId,
			username,
		});
	},
);

await asyncMessage
	.collections
	.updateUser
	.start(true);
