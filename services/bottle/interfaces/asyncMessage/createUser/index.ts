import { userIdObjecter, userEmailObjecter, usernameObjecter, userLanguageObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { createUserUsecase } from "@interfaces/usecases";

asyncMessage.collections.createUser.on(
	async(createdUser) => {
		const userId = userIdObjecter.unsafeCreate(createdUser.value.userId);
		const username = usernameObjecter.unsafeCreate(createdUser.value.username);
		const email = userEmailObjecter.unsafeCreate(createdUser.value.email);
		const language = userLanguageObjecter.unsafeCreate(createdUser.value.language);

		await createUserUsecase.execute({
			id: userId,
			username,
			email,
			language,
		});
	},
);

await asyncMessage
	.collections
	.createUser
	.start(true);
