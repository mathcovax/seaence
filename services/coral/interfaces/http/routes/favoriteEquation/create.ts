import { equationObjecter } from "@business/domains/common/equation";
import { userIdObjecter } from "@business/domains/common/user";
import { FavoriteEquationEntity, favoriteEquationNameObjecter } from "@business/domains/entities/favoriteEquation";
import { userCreateFavoriteEquationUsecase } from "@interfaces/usecase";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-favorite-equation")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			equation: equationObjecter.toZodSchema(),
			favoriteEquationName: favoriteEquationNameObjecter.toZodSchema(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { userId, equation, favoriteEquationName } = pickup("body");

			const result = await userCreateFavoriteEquationUsecase.execute({
				userId,
				equation,
				favoriteEquationName,
			});

			return match({ result })
				.with(
					{ result: { information: "favori-equation-name-already-use" } },
					() => new ConflictHttpResponse("favoriEquation.nameAlreadyUse"),
				)
				.with(
					{ result: P.instanceOf(FavoriteEquationEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(ConflictHttpResponse, "favoriEquation.nameAlreadyUse"),
	)
	.handler(
		() => new OkHttpResponse("favoriEqaution.created"),
		makeResponseContract(OkHttpResponse, "favoriEqaution.created"),
	);
