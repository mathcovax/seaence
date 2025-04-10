import { IWantFirebaseTokenValid } from "@interfaces/http/checkers/token";
import { endpointAuthSchema } from "@interfaces/http/schemas/auth";
import { AccessToken } from "@interfaces/providers/token";
import { findOrCreateUser } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/auth")
	.extract({
		body: zod.string(),
	})
	.presetCheck(
		IWantFirebaseTokenValid,
		(pickup) => pickup("body"),
	)
	.handler(
		async(pickup) => {
			const { email } = pickup("firebaseToken");

			const user = await findOrCreateUser.execute({
				email,
			});

			const token = AccessToken.generateToken(user);

			return new CreatedHttpResponse(
				"user.logged",
				{ accessToken: token },
			);
		},
		makeResponseContract(CreatedHttpResponse, "user.logged", endpointAuthSchema),
	);
