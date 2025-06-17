import { mustBeUserFavoriteEquationExistProcess } from "@interfaces/http/processes/mustBeUserFavoriteEquationExist";
import { endpointFindOneFavoriteEquationSchema } from "@interfaces/http/schemas/favoriteEquation";

useBuilder()
	.createRoute("POST", "/find-one-favorite-equation")
	.execute(
		mustBeUserFavoriteEquationExistProcess,
		{ pickup: ["userFavoriteEquation"] },
	)
	.handler(
		(pickup) => {
			const { userFavoriteEquation } = pickup(["userFavoriteEquation"]);

			return new OkHttpResponse("favoriteEquation.findOne", userFavoriteEquation.value.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "favoriteEquation.findOne", endpointFindOneFavoriteEquationSchema),
	);
