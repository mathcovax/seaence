import { userEmailObjecter, userIdObjecter, userLanguageObjecter, usernameObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { findOneUserByIdUsecase, updateUserUsecase } from "@interfaces/usecases";
import { TechnicalError } from "@vendors/clean";

asyncMessage.collections.updateUser.on(
	async(updateUserPayload) => {
		const userId = userIdObjecter.unsafeCreate(updateUserPayload.value.id);

		const findedUser = await findOneUserByIdUsecase.execute({ userId });
		if (!findedUser) {
			throw new TechnicalError("notfound-user-when-update", { data: { updateUserPayload } });
		}

		await updateUserUsecase.execute({
			user: findedUser,
			username: usernameObjecter.unsafeCreate(updateUserPayload.value.username),
			language: userLanguageObjecter.unsafeCreate(updateUserPayload.value.language),
			email: userEmailObjecter.unsafeCreate(updateUserPayload.value.email),
		});
	},
);

await asyncMessage
	.collections
	.updateUser
	.start(true);
