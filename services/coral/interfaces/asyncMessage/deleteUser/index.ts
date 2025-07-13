import { userIdObjecter } from "@business/domains/common/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { deleteAllUserDataUsecase } from "@interfaces/usecase";

asyncMessage.collections.deleteUser.on(
	async({ value }) => {
		const userId = userIdObjecter.unsafeCreate(value.userId);

		await deleteAllUserDataUsecase.execute({ userId });
	},
);

await asyncMessage
	.collections
	.deleteUser
	.start(true);
