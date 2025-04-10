import { userRepository } from "@business/applications/repositories/user";
import { type UserEmail } from "@business/domains/entities/user";
import { type GetTypeInput } from "@duplojs/core";

export const inputUserExist = createTypeInput<{
	email: UserEmail;
}>();

export const userExistsCheck = createChecker("userExists")
	.handler(
		async(input: GetTypeInput<typeof inputUserExist>, output) => {
			const user = await userRepository.use.findOneByEmail(input.value);

			if (user) {
				return output("user.found", user);
			} else {
				return output("user.notfound", null);
			}
		},
	);

export const IWantUserExistsByEmail = createPresetChecker(
	userExistsCheck,
	{
		result: "user.found",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
	},
	makeResponseContract(NotFoundHttpResponse, "user.notfound"),
);
