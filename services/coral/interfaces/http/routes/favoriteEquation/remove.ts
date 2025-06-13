import { mustBeUserFavoriteEquationExistProcess } from "@interfaces/http/processes/mustBeUserFavoriteEquationExist";
import { userRemoveFavoriteEquationUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/remove-favorite-equation")
	.execute(
		mustBeUserFavoriteEquationExistProcess,
		{ pickup: ["userFavoriteEquation"] },
	)
	.handler(
		async(pickup) => {
			const { userFavoriteEquation } = pickup(["userFavoriteEquation"]);

			await userRemoveFavoriteEquationUsecase.execute({
				userFavoriteEquation,
			});

			return new OkHttpResponse("favoriequation.removed");
		},
		makeResponseContract(OkHttpResponse, "favoriequation.removed"),
	);

