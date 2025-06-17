import { HarborAPI } from "@interfaces/providers/harbor";
import { endpointUserSchema } from "../schemas/user";
import { useMustBeConnectedBuilder } from "../security/authentication";
import { match } from "ts-pattern";
import { userLanguageObjecter, userUsernameObjecter } from "@business/entities/user";

useMustBeConnectedBuilder()
	.createRoute("POST", "/self-user")
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse("user.self", user);
		},
		makeResponseContract(OkHttpResponse, "user.self", endpointUserSchema),
	);

useMustBeConnectedBuilder()
	.createRoute("POST", "/update-self-user")
	.extract({
		body: {
			username: userUsernameObjecter.zodSchema.optional(),
			language: userLanguageObjecter.zodSchema.optional(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { user, username, language } = pickup(["user", "username", "language"]);

			const result = await HarborAPI.updateUser({
				userId: user.id,
				username,
				language,
			});

			return match(result)
				.with(
					{ information: "user.shortUpdatedDelay" },
					({ information }) => new ForbiddenHttpResponse(information),
				)
				.with(
					{ information: "user.notfound" },
					({ information }) => new NotFoundHttpResponse(information),
				)
				.with(
					{ information: "user.updated" },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(ForbiddenHttpResponse, "user.shortUpdatedDelay"),
			...makeResponseContract(NotFoundHttpResponse, "user.notfound"),
		],
	)
	.handler(
		() => new NoContentHttpResponse("user.rename"),
		makeResponseContract(NoContentHttpResponse, "user.rename"),
	);
