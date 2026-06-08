import { UserId } from "@business/domains/common/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { useCases } from "@interfaces/useCases";

asyncMessage.collections.deleteUser.on(
	async({ value }) => {
		const userId = UserId.createOrThrow(value.userId);

		await useCases.deleteAllUserDataUseCase({ userId });
	},
);

await asyncMessage
	.collections
	.deleteUser
	.start(true);
