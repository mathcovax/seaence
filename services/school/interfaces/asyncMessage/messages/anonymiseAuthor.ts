import { UserId } from "@domains/common/user";
import { asyncMessage } from "@providers/asyncMessage";
import { useCases } from "@adapters/useCases";

asyncMessage.collections.deleteUser.on(
	async({ value }) => {
		const userId = UserId.createOrThrow(value.userId);

		await useCases.anonymiseAuthorUseCase({ userId });
	},
);

await asyncMessage
	.collections
	.deleteUser
	.start(true);
