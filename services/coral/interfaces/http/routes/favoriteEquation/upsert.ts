import { UserId } from "@business/domains/common/user";
import { FavoriteEquation } from "@business/domains/entities/favoriteEquation";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/upsert-favorite-equation")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			equation: FavoriteEquation.Equation.toExtractParser(),
			favoriteEquationName: FavoriteEquation.Name.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.noContent("favoriteEquation.upsert"),
		({ body }, { response }) => useCases
			.ownerUpsertFavoriteEquationUseCase(body)
			.then(
				() => response("favoriteEquation.upsert"),
			),
	);
