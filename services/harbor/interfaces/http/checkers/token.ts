import { userEmailObjecter } from "@business/domains/entities/user";
import { firebaseAuth } from "@interfaces/providers/firebase";

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

export const IWantFirebaseTokenValid = createPresetChecker(
	firebaseTokenChecker,
	{
		result: "firebase.token.valid",
		catch: () => new UnauthorizedHttpResponse("firebase.token.invalid"),
		indexing: "firebaseToken",
	},
	makeResponseContract(UnauthorizedHttpResponse, "firebase.token.invalid"),
);
