import { HarborAPI } from "@interfaces/providers/harbor";
import { match } from "ts-pattern";
import { User } from "@business/entities/user";

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
		makeResponseContract(OkHttpResponse, "user.logged", User.login),
	);

useBuilder()
	.createRoute("POST", "/register")
	.extract({
		body: zod.object({
			firebaseToken: zod.string(),
			username: User.username,
			language: User.language,
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { firebaseToken, username, language } = pickup("body");

			const result = await HarborAPI.register({
				firebaseToken,
				username,
				language,
			});

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
		makeResponseContract(OkHttpResponse, "user.registered", User.login),
	);
