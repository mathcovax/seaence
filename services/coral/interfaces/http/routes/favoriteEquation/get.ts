import { mustBeUserFavoriteEquationExistProcess } from "@interfaces/http/processes/mustBeUserFavoriteEquationExist";
import { endpointGetFavoriteEquationRouteSchema } from "@interfaces/http/schemas/favoriteEquation";

useBuilder()
	.createRoute("POST", "/get-favorite-equation")
	.execute(
		mustBeUserFavoriteEquationExistProcess,
		{ pickup: ["userFavoriteEquation"] },
	)
	.handler(
		(pickup) => {
			const { userFavoriteEquation } = pickup(["userFavoriteEquation"]);

			return new OkHttpResponse("favoriEquation.found", userFavoriteEquation.value.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "favoriEquation.found", endpointGetFavoriteEquationRouteSchema),
	);
