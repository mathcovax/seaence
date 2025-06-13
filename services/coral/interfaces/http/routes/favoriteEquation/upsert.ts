import { equationObjecter } from "@business/domains/common/equation";
import { userIdObjecter } from "@business/domains/common/user";
import { favoriteEquationNameObjecter } from "@business/domains/entities/favoriteEquation";
import { userUpsertFavoriteEquationUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/upsert-favorite-equation")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			equation: equationObjecter.toZodSchema(),
			favoriteEquationName: favoriteEquationNameObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, equation, favoriteEquationName } = pickup("body");

			await userUpsertFavoriteEquationUsecase.execute({
				userId,
				equation,
				favoriteEquationName,
			});

			return new NoContentHttpResponse("favoriteEquation.upsert");
		},
		makeResponseContract(NoContentHttpResponse, "favoriteEquation.upsert"),
	);
