import { UserEntity, userIdObjecter } from "@business/domains/entities/user";
import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { deleteUserUsecase } from "@interfaces/usecases";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/user/delete")
	.extract({
		body: {
			userId: userIdObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("userId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { user } = pickup(["user"]);
			const result = await deleteUserUsecase.execute({
				user,
			});

			return match({ result })
				.with(
					{ result: { information: "user-already-delete" } },
					() => new ForbiddenHttpResponse("user.alreadyDelete"),
				)
				.with(
					{ result: P.instanceOf(UserEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(ForbiddenHttpResponse, "user.alreadyDelete"),
	)
	.handler(
		() => new NoContentHttpResponse("user.deleted"),
		makeResponseContract(NoContentHttpResponse, "user.deleted"),
	);
