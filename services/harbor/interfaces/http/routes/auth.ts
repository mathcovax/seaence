import { IWantFirebaseTokenIsValid } from "@interfaces/http/checkers/token";
import { endpointAuthSchema } from "@interfaces/http/schemas/auth";
import { AccessToken } from "@interfaces/providers/token";
import { findOrCreateUser, renameUserUsecase } from "@interfaces/usecases";
import { endpointUserSchema } from "../schemas/user";
import { userIdObjecter, userUsernameObjecter } from "@business/domains/entities/user";
import { findUserWithAccessTokenProcess } from "../processes/findUserWithAccessToken";
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
	.createRoute("POST", "/find-user")
	.execute(
		findUserWithAccessTokenProcess,
		{ pickup: ["user"] },
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

useBuilder()
	.createRoute("POST", "/rename-user")
	.extract({
		body: {
			userId: userIdObjecter.toZodSchema(),
			newUsername: userUsernameObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("userId"),
	)
	.handler(
		async(pickup) => {
			const { user, newUsername } = pickup(["newUsername", "user"]);

			await renameUserUsecase.execute({
				user,
				newUsername,
			});

			return new NoContentHttpResponse("user.rename");
		},
		makeResponseContract(NoContentHttpResponse, "user.rename"),
	);
