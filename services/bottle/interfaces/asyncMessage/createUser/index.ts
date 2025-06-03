import { userIdObjecter, userEmailObjecter, usernameObjecter, userLanguageObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { createUserUsecase } from "@interfaces/usecases";

asyncMessage.collections.createUser.on(
	async(createUserValue) => {
		const userId = userIdObjecter.unsafeCreate(createUserValue.value.userId);
		const username = usernameObjecter.unsafeCreate(createUserValue.value.username);
		const email = userEmailObjecter.unsafeCreate(createUserValue.value.email);
		const language = userLanguageObjecter.unsafeCreate(createUserValue.value.language);

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
