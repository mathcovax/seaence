import { userIdObjecter } from "@business/domains/common/user";
import { favoriteEquationIdObjecter } from "@business/domains/entities/favoriteEquation";
import { userFindFavoriteEquationByIdUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

export const mustBeUserFavoriteEquationExistProcess = createProcess("mustBeUserFavoriteEquationExist")
	.extract({
		body: {
			userId: userIdObjecter.toZodSchema(),
			favoriteEquationId: favoriteEquationIdObjecter.toZodSchema(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { favoriteEquationId, userId } = pickup(["favoriteEquationId", "userId"]);

			const result = await userFindFavoriteEquationByIdUsecase.execute({
				favoriteEquationId,
				userId,
			});

			return match({ result })
				.with(
					{ result: { information: "wrong-proprietary" } },
					() => new ForbiddenHttpResponse("favoriteEquation.wrongProprietary"),
				)
				.with(
					{ result: null },
					() => new NotFoundHttpResponse("favoriteEquation.notfound"),
				)
				.with(
					{ result: { _name: "userFavoriteEquation" } },
					({ result: userFavoriteEquation }) => dropper({ userFavoriteEquation }),
				)
				.exhaustive();
		},
		["userFavoriteEquation"],
		[
			...makeResponseContract(ForbiddenHttpResponse, "favoriteEquation.wrongProprietary"),
			...makeResponseContract(NotFoundHttpResponse, "favoriteEquation.notfound"),
		],
	)
	.exportation(["userFavoriteEquation"]);
