import { mustBeProprietaryOfFavoriEquationRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfFavoriEquation";
import { endpointGetFavoriEquationRouteSchema } from "@interfaces/http/schemas/favoriEquation";

mustBeProprietaryOfFavoriEquationRouteBuilder()
	.createRoute("POST", "/get-favorite-equation")
	.handler(
		(pickup) => {
			const { favoriEquation } = pickup(["favoriEquation"]);

			return new OkHttpResponse("favoriEquation.found", favoriEquation.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "favoriEquation.found", endpointGetFavoriEquationRouteSchema),
	);
