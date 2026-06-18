import { UserId, UserName } from "@domains/common/user";
import { asyncMessage } from "@providers/asyncMessage";
import { useCases } from "@adapters/useCases";

asyncMessage.collections.restoreUser.on(
	async({ value }) => {
		const userId = UserId.createOrThrow(value.userId);
		const username = UserName.createOrThrow(value.username);

		await useCases.restoreAuthorUseCase({
			userId,
			username,
		});
	},
);

await asyncMessage
	.collections
	.restoreUser
	.start(true);
