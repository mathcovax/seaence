import { type UserId } from "@business/domains/entities/user";
import { type GetTypeInput } from "@duplojs/core";
import { findUserById } from "@interfaces/usecases";
import { match } from "ts-pattern";

export const inputUserExist = createTypeInput<{
	id: UserId;
}>();

export const userExistCheck = createChecker("userExist")
	.handler(
		async(input: GetTypeInput<typeof inputUserExist>, output) => {
			const user = await match(input)
				.with(
					{ inputName: "id" },
					({ value }) => findUserById.execute({ id: value }),
				)
				.exhaustive();

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", null);
			}
		},
	);

export const IWantUserExistsById = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		transformInput: inputUserExist.id,
		indexing: "user",
	},
	makeResponseContract(NotFoundHttpResponse, "user.notfound"),
);
