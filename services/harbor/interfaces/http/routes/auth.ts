import { IWantAccessTokenIsValid, IWantFirebaseTokenIsValid } from "@interfaces/http/checkers/token";
import { endpointAuthSchema } from "@interfaces/http/schemas/auth";
import { AccessToken } from "@interfaces/providers/token";
import { findOrCreateUser } from "@interfaces/usecases";
import { endpointUserSchema } from "../schemas/user";
import { IWantUserExistsById } from "../checkers/user";

useBuilder()
	.createRoute("POST", "/authentication")
	.extract({
		body: zod.string(),
	})
	.presetCheck(
		IWantFirebaseTokenIsValid,
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

useBuilder()
	.createRoute("POST", "/user")
	.extract({
		body: zod.string(),
	})
	.presetCheck(
		IWantAccessTokenIsValid,
		(pickup) => pickup("body"),
	)
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("accessTokenContent").userId,
	)
	.handler(
		(pickup) => {
			const user = pickup("user");

			return new OkHttpResponse(
				"user.found",
				user.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "user.found", endpointUserSchema),
	);
