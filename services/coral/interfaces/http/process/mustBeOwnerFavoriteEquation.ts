import { UserId } from "@business/domains/common/user";
import { FavoriteEquation } from "@business/domains/entities/favoriteEquation";
import { ResponseContract, useProcessBuilder } from "@duplojs/http";
import { asyncPipe, DPE, E } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

export const mustBeOwnerFavoriteEquationProcess = useProcessBuilder()
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			favoriteEquationId: FavoriteEquation.Id.toExtractParser(),
		}),
	})
	.cut(
		[
			ResponseContract.forbidden("favoriteEquation.wrongProprietary"),
			ResponseContract.notFound("favoriteEquation.notfound"),
		],
		({ body }, { response, output }) => asyncPipe(
			useCases.ownerFindFavoriteEquationByIdUseCase(body),
			E.whenHasInformation(
				"none-favoriteEquation",
				() => response("favoriteEquation.notfound"),
			),
			E.whenHasInformation(
				"wrong-proprietary",
				() => response("favoriteEquation.wrongProprietary"),
			),
			E.whenHasInformation(
				"success",
				(ownerFavoriteEquation) => output({ ownerFavoriteEquation }),
			),
		),
	)
	.exports(["ownerFavoriteEquation"]);
