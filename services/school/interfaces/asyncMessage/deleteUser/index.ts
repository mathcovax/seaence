import { userIdObjecter } from "@business/domains/common/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { anonymizeAuthorUsecase } from "@interfaces/usecase";

asyncMessage.collections.deleteUser.on(
	async({ value }) => {
		const authorId = userIdObjecter.unsafeCreate(value.userId);

		await anonymizeAuthorUsecase.execute({
			authorId,
		});
	},
);

await asyncMessage
	.collections
	.deleteUser
	.start(true);
