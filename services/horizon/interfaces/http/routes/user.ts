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

			const result = await HarborAPI.updateUserPersonalData({
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

useMustBeConnectedBuilder()
	.createRoute("POST", "/delete-self-user")
	.cut(
		async({ pickup, dropper }) => {
			const { user } = pickup(["user"]);

			const result = await HarborAPI.deleteUser(user.id);

			return match(result)
				.with(
					{ information: "user.alreadyDelete" },
					({ information }) => new ForbiddenHttpResponse(information),
				)
				.with(
					{ information: "user.notfound" },
					({ information }) => new NotFoundHttpResponse(information),
				)
				.with(
					{ information: "user.deleted" },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(ForbiddenHttpResponse, "user.alreadyDelete"),
			...makeResponseContract(NotFoundHttpResponse, "user.notfound"),
		],
	)
	.handler(
		() => new NoContentHttpResponse("user.deleted"),
		makeResponseContract(NoContentHttpResponse, "user.deleted"),
	);
