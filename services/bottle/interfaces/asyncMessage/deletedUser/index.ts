import { userIdObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { anonymizeUserUsecase, findOneUserByIdUsecase } from "@interfaces/usecases";
import { TechnicalError } from "@vendors/clean";

asyncMessage.collections.deleteUser.on(
	async(payload) => {
		const userId = userIdObjecter.unsafeCreate(payload.value.userId);

		const findedUser = await findOneUserByIdUsecase.execute({ userId });
		if (!findedUser) {
			throw new TechnicalError("notfound-user-when-anonymize", { data: { payload } });
		}

		await anonymizeUserUsecase
			.execute({
				user: findedUser,
			});
	},
);

await asyncMessage
	.collections
	.deleteUser
	.start(true);
