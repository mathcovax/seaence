import { PartialFavoriteEquationNameConstraint } from "@business/applications/repositories/favoriteEquation";
import { UserId } from "@business/domains/common/user";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, C, DPE, innerPipe, O, A, unwrapGroup, unwrap } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

const endpointDataParser = DPE.object({
	id: DPE.string(),
	name: DPE.string(),
}).array();

useRouteBuilder("POST", "/find-many-favorite-equation-name")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			partialFavoriteEquationName: PartialFavoriteEquationNameConstraint.toExtractParser(),
			page: C.Int.toExtractParser(),
			quantityPerPage: C.PositiveInt.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("favoriteEquation.name.findMany", endpointDataParser),
		({ body }, { response }) => asyncPipe(
			useCases.ownerFindManyFavoriteEquationUseCase(body),
			A.map(
				innerPipe(
					O.pick(["id", "name"]),
					unwrapGroup,
				),
			),
			(result) => response("favoriteEquation.name.findMany", result),
		),
	);

const endpointDetailsDataParser = DPE.object({
	total: DPE.number(),
});

useRouteBuilder("POST", "/find-many-favorite-equation-details")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			partialFavoriteEquationName: PartialFavoriteEquationNameConstraint.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("favoriteEquation.findMany.details", endpointDetailsDataParser),
		({ body }, { response }) => asyncPipe(
			useCases.ownerCountResultOfFindManyFavoriteEquationUseCase(body),
			unwrap,
			(total) => response("favoriteEquation.findMany.details", { total }),
		),
	);
