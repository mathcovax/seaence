import { userEmailObjecter, userIdObjecter, userLanguageObjecter, usernameObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { findOneUserByIdUsecase, restoreUserUsecase } from "@interfaces/usecases";
import { TechnicalError } from "@vendors/clean";

asyncMessage.collections.restoreUser.on(
	async(payload) => {
		const userId = userIdObjecter.unsafeCreate(payload.value.userId);

		const findedUser = await findOneUserByIdUsecase.execute({ userId });
		if (!findedUser) {
			throw new TechnicalError("notfound-user-when-restore", { data: { payload } });
		}

		await restoreUserUsecase
			.execute({
				user: findedUser,
				username: usernameObjecter.unsafeCreate(payload.value.username),
				email: userEmailObjecter.unsafeCreate(payload.value.email),
				language: userLanguageObjecter.unsafeCreate(payload.value.language),
			});
	},
);

await asyncMessage
	.collections
	.restoreUser
	.start(true);
