import { userEmailObjecter } from "@business/domains/entities/user";
import { firebaseAuth } from "@interfaces/providers/firebase";
import { AccessToken } from "@interfaces/providers/token";

export const firebaseTokenChecker = createChecker("firebaseToken")
	.handler(
		async(input: string, output) => {
			try {
				const firebaseToken = await firebaseAuth.verifyIdToken(input);

				const { email } = firebaseToken;

				return output("firebase.token.valid", {
					...firebaseToken,
					email: userEmailObjecter.unknownThrowCreate(email),
				});
			} catch {
				return output("firebase.token.invalid", null);
			}
		},
	);

export const IWantFirebaseTokenIsValid = createPresetChecker(
	firebaseTokenChecker,
	{
		result: "firebase.token.valid",
		catch: () => new UnauthorizedHttpResponse("firebase.token.invalid"),
		indexing: "firebaseTokenContent",
	},
	makeResponseContract(UnauthorizedHttpResponse, "firebase.token.invalid"),
);

export const accessTokenChecker = createChecker("accessToken")
	.handler(
		(input: string, output) => {
			const accessToken = AccessToken.checkToken(input);

			if (accessToken) {
				return output("access.token.valid", accessToken);
			} else {
				return output("accessToken.invalid", null);
			}
		},
	);

export const IWantAccessTokenIsValid = createPresetChecker(
	accessTokenChecker,
	{
		result: "access.token.valid",
		catch: () => new UnauthorizedHttpResponse("accessToken.invalid"),
		indexing: "accessTokenContent",
	},
	makeResponseContract(UnauthorizedHttpResponse, "accessToken.invalid"),
);
