import { FavoriteEquation } from "@business/domains/entities/favoriteEquation";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C } from "@duplojs/utils";
import { mustBeOwnerFavoriteEquationProcess } from "@interfaces/http/process/mustBeOwnerFavoriteEquation";

useRouteBuilder("POST", "/find-one-favorite-equation")
	.exec(
		mustBeOwnerFavoriteEquationProcess,
		{ imports: ["ownerFavoriteEquation"] },
	)
	.handler(
		ResponseContract.ok("favoriteEquation.findOne", FavoriteEquation.Entity.toEndpointSchema()),
		(floor, { response }) => response(
			"favoriteEquation.findOne",
			C.unwrapEntity(floor.ownerFavoriteEquation),
		),
	);
