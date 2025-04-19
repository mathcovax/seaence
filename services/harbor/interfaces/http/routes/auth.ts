import { IWantFirebaseTokenValid } from "@interfaces/http/checkers/token";
import { endpointAuthSchema } from "@interfaces/http/schemas/auth";
import { AccessToken } from "@interfaces/providers/token";
import { findOrCreateUser } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/authentication")
	.extract({
		body: zod.string(),
	})
	.presetCheck(
		IWantFirebaseTokenValid,
		(pickup) => pickup("body"),
	)
	.handler(
		async(pickup) => {
			const { email } = pickup("firebaseTokenContent");

			const user = await findOrCreateUser.execute({
				email,
			});

			const token = AccessToken.generateToken(user);

			return new OkHttpResponse(
				"user.logged",
				token,
			);
		},
		makeResponseContract(OkHttpResponse, "user.logged", endpointAuthSchema),
	);
