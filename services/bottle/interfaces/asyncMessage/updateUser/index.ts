import { userIdObjecter, userLanguageObjecter, usernameObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { findOneUserByIdUsecase, updateUserUsecase } from "@interfaces/usecases";
import { TechnicalError } from "@vendors/clean";

asyncMessage.collections.updateUser.on(
	async(updateUserPayload) => {
		const userId = userIdObjecter.unsafeCreate(updateUserPayload.value.userId);

		const findedUser = await findOneUserByIdUsecase.execute({ userId });
		if (!findedUser) {
			throw new TechnicalError("notfound-user-when-update", { data: { updateUserPayload } });
		}

		const {
			username,
			language,
		} = updateUserPayload.value;

		if (!username && !language) {
			return;
		}

		await updateUserUsecase
			.execute({
				user: findedUser,
				username: username !== undefined
					? usernameObjecter.unsafeCreate(username)
					: undefined,
				language: language && userLanguageObjecter.unsafeCreate(language),
			});
	},
);

await asyncMessage
	.collections
	.updateUser
	.start(true);
