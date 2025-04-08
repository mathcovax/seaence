import { userRepository } from "@business/applications/repositories/user";
import { type UserEmail } from "@business/domains/entities/user";

export const userExistsCheck = createChecker("userExists")
	.handler(
		async(input: UserEmail, output) => {
			const user = await userRepository.use.findOneByEmail(input);

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
