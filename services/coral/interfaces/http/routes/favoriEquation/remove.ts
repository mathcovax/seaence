import { mustBeProprietaryOfFavoriEquationRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfFavoriEquation";
import { removeEquationInFavoriUsecase } from "@interfaces/usecase";

mustBeProprietaryOfFavoriEquationRouteBuilder()
	.createRoute("POST", "/remove-equation-from-favorite")
	.handler(
		async(pickup) => {
			const { favoriEquation } = pickup(["favoriEquation"]);

			await removeEquationInFavoriUsecase.execute({
				favoriEquation,
			});

			return new OkHttpResponse("favoriequation.removed");
		},
		makeResponseContract(OkHttpResponse, "favoriequation.removed"),
	);

