import { type UserEmail, type UserId } from "@business/domains/entities/user";
import { type GetTypeInput } from "@duplojs/core";
import { findUserByEmail, findUserById } from "@interfaces/usecases";
import { match } from "ts-pattern";

export const inputUserExist = createTypeInput<{
	id: UserId;
	email: UserEmail;
}>();

export const userExistCheck = createChecker("userExist")
	.handler(
		async(input: GetTypeInput<typeof inputUserExist>, output) => {
			const user = await match(input)
				.with(
					{ inputName: "id" },
					({ value }) => findUserById.execute({ id: value }),
				)
				.with(
					{ inputName: "email" },
					({ value }) => findUserByEmail.execute({ email: value }),
				)
				.exhaustive();

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", null);
			}
		},
	);

export const IWantUserExists = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
	},
	makeResponseContract(NotFoundHttpResponse, "user.notfound"),
);

export const IWantUserExistsById = IWantUserExists
	.transformInput(inputUserExist.id);

export const IWantUserExistsByEmail = IWantUserExists
	.transformInput(inputUserExist.email);
