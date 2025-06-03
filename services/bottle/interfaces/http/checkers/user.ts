import { type UserId } from "@business/domains/entities/user";
import { findUserByIdUsecase } from "@interfaces/usecases";

const userExistByIdCheck = createChecker("userExist")
	.handler(
		async(userId: UserId, output) => {
			const user = await findUserByIdUsecase.execute({ userId });

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", null);
			}
		},
	);

export const IWantUserExistsById = createPresetChecker(
	userExistByIdCheck,
	{
		indexing: "user",
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
	},
);
