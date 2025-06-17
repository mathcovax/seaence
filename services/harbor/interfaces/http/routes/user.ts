import { updateUser } from "@interfaces/usecases";
import { endpointUserSchema } from "../schemas/user";
import { UserEntity, userIdObjecter, userLanguageObjecter, userUsernameObjecter } from "@business/domains/entities/user";
import { findUserWithAccessTokenProcess } from "../processes/findUserWithAccessToken";
import { IWantUserExistsById } from "../checkers/user";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/find-user")
	.execute(
		findUserWithAccessTokenProcess,
		{ pickup: ["user"] },
	)
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse(
				"user.found",
				user.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "user.found", endpointUserSchema),
	);

useBuilder()
	.createRoute("POST", "/update-user")
	.extract({
		body: {
			userId: userIdObjecter.toZodSchema(),
			username: userUsernameObjecter.toZodSchema().optional(),
			language: userLanguageObjecter.toZodSchema().optional(),
		},
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("userId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { user, username } = pickup(["username", "user"]);
			const result = await updateUser.execute({
				user,
				username,
			});

			return match({ result })
				.with(
					{ result: { information: "update-delay-is-not-respected" } },
					() => new ForbiddenHttpResponse("user.shortUpdatedDelay"),
				)
				.with(
					{ result: P.instanceOf(UserEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(ForbiddenHttpResponse, "user.shortUpdatedDelay"),
	)
	.handler(
		() => new NoContentHttpResponse("user.updated"),
		makeResponseContract(NoContentHttpResponse, "user.updated"),
	);
