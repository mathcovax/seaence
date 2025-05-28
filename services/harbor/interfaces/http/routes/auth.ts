import { AccessToken } from "@interfaces/providers/token";
import { IWantFirebaseTokenIsValid } from "../checkers/token";
import { IWantUserExistsByEmail } from "../checkers/user";
import { endpointAuthSchema } from "../schemas/auth";
import { userUsernameObjecter } from "@business/domains/entities/user";
import { createUser } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/login")
	.extract({
		body: {
			firebaseToken: zod.string(),
		},
	})
	.presetCheck(
		IWantFirebaseTokenIsValid,
		(pickup) => pickup("firebaseToken"),
	)
	.presetCheck(
		IWantUserExistsByEmail,
		(pickup) => pickup("firebaseTokenContent").email,
	)
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			const accessToken = AccessToken.generateToken(user);

			return new OkHttpResponse(
				"user.logged",
				{ accessToken },
			);
		},
		makeResponseContract(OkHttpResponse, "user.logged", endpointAuthSchema),
	);

useBuilder()
	.createRoute("POST", "/register")
	.extract({
		body: {
			firebaseToken: zod.string(),
			username: userUsernameObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		IWantFirebaseTokenIsValid,
		(pickup) => pickup("firebaseToken"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { username, firebaseTokenContent } = pickup(["firebaseTokenContent", "username"]);
			const result = await createUser.execute({
				username,
				email: firebaseTokenContent.email,
			});

			if (result instanceof Error) {
				return new ConflictHttpResponse("user.emailAlreadyExist");
			}

			return dropper({ user: result });
		},
		["user"],
		makeResponseContract(ConflictHttpResponse, "user.emailAlreadyExist"),
	)
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			const accessToken = AccessToken.generateToken(user);

			return new OkHttpResponse(
				"user.registered",
				{ accessToken },
			);
		},
		makeResponseContract(OkHttpResponse, "user.registered", endpointAuthSchema),
	);
