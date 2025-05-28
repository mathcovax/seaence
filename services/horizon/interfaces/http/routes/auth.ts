import { HarborAPI } from "@interfaces/providers/harbor";
import { match } from "ts-pattern";
import { endpointAuthSchema } from "../schemas/auth";
import { userUsernameObjecter } from "@business/entities/user";

useBuilder()
	.createRoute("POST", "/login")
	.extract({
		body: { firebaseToken: zod.string() },
	})
	.cut(
		async({ pickup, dropper }) => {
			const { firebaseToken } = pickup(["firebaseToken"]);

			const harborResponse = await HarborAPI.login(
				firebaseToken,
			);

			return match(harborResponse)
				.with(
					{ information: "firebase.token.invalid" },
					() => new UnauthorizedHttpResponse("credential.invalid"),
				)
				.with(
					{ information: "user.notfound" },
					() => new NotFoundHttpResponse("user.notfound"),
				)
				.with(
					{ information: "user.logged" },
					({ body }) => dropper(body),
				)
				.exhaustive();
		},
		["accessToken"],
		[
			...makeResponseContract(UnauthorizedHttpResponse, "credential.invalid"),
			...makeResponseContract(NotFoundHttpResponse, "user.notfound"),
		],
	)
	.handler(
		(pickup) => {
			const { accessToken } = pickup(["accessToken"]);

			return new OkHttpResponse("user.logged", { accessToken });
		},
		makeResponseContract(OkHttpResponse, "user.logged", endpointAuthSchema),
	);

useBuilder()
	.createRoute("POST", "/register")
	.extract({
		body: {
			firebaseToken: zod.string(),
			username: userUsernameObjecter.zodSchema,
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { firebaseToken, username } = pickup(["firebaseToken", "username"]);

			const result = await HarborAPI.register(
				firebaseToken,
				username,
			);

			return match(result)
				.with(
					{ information: "firebase.token.invalid" },
					() => new UnauthorizedHttpResponse("credential.invalid"),
				)
				.with(
					{ information: "user.emailAlreadyExist" },
					() => new ConflictHttpResponse("user.alreadyExist"),
				)
				.with(
					{ information: "user.registered" },
					({ body }) => dropper(body),
				)
				.exhaustive();
		},
		["accessToken"],
		[
			...makeResponseContract(UnauthorizedHttpResponse, "credential.invalid"),
			...makeResponseContract(ConflictHttpResponse, "user.alreadyExist"),
		],
	)
	.handler(
		(pickup) => {
			const { accessToken } = pickup(["accessToken"]);

			return new OkHttpResponse("user.registered", { accessToken });
		},
		makeResponseContract(OkHttpResponse, "user.registered", endpointAuthSchema),
	);
