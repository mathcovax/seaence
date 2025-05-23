import { IWantAccessTokenIsValid } from "../checkers/token";
import { IWantUserExistsById } from "../checkers/user";

export const findUserWithAccessTokenProcess = createProcess("findUserWithAccessTokenProcess")
	.extract({
		body: {
			accessToken: zod.string(),
		},
	})
	.presetCheck(
		IWantAccessTokenIsValid,
		(pickup) => pickup("accessToken"),
	)
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("accessTokenContent").userId,
	)
	.exportation(["user"]);
