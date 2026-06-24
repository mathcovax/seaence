import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { mustBeOwnerFavoriteEquationProcess } from "@interfaces/http/process/mustBeOwnerFavoriteEquation";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/remove-favorite-equation")
	.exec(
		mustBeOwnerFavoriteEquationProcess,
		{ imports: ["ownerFavoriteEquation"] },
	)
	.handler(
		ResponseContract.noContent("favoriteEquation.removed"),
		(floor, { response }) => useCases
			.ownerRemoveFavoriteEquationUseCase(floor)
			.then(
				() => response("favoriteEquation.removed"),
			),
	);
