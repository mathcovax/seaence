import { HarborAPI } from "@interfaces/providers/harbor";
import { useMustBeConnectedBuilder } from "../security/authentication";
import { match } from "ts-pattern";
import { User } from "@business/entities/user";

useMustBeConnectedBuilder()
	.createRoute("POST", "/self-user")
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse("user.self", user);
		},
		makeResponseContract(OkHttpResponse, "user.self", User.index),
	);

useMustBeConnectedBuilder()
	.createRoute("POST", "/update-self-user")
	.extract({
		body: {
			username: User.username.optional(),
			language: User.language.optional(),
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
		() => new NoContentHttpResponse("user.updated"),
		makeResponseContract(NoContentHttpResponse, "user.updated"),
	);
