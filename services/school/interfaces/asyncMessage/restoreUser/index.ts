import { userIdObjecter, usernameObjecter } from "@business/domains/common/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { restoreAuthorUsecase } from "@interfaces/usecase";

asyncMessage.collections.restoreUser.on(
	async({ value }) => {
		const authorId = userIdObjecter.unsafeCreate(value.userId);
		const newAuthorName = usernameObjecter.unsafeCreate(value.username);

		await restoreAuthorUsecase.execute({
			authorId,
			newAuthorName,
		});
	},
);

await asyncMessage
	.collections
	.restoreUser
	.start(true);
