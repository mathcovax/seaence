import { userIdObjecter } from "@business/domains/common/user";
import { favoriEquatioonNameObjecter } from "@business/domains/entities/favoriEquation";
import { endpointSearchFavoriEquationRouteSchema } from "@interfaces/http/schemas/favoriEquation";
import { searchFavoriEquationUsecase } from "@interfaces/usecase";
import { positiveIntObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-favori-equations-per-page")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialNameFavoriEquation: favoriEquatioonNameObjecter.toZodSchema(),
			page: positiveIntObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialNameFavoriEquation, page, quantityPerPage } = pickup("body");

			const { favoriEquations, numberOfEqation } = await searchFavoriEquationUsecase.execute({
				favoriEquationName: partialNameFavoriEquation,
				page,
				quantityPerPage,
				userId,
			});

			const simpleFavoriEquations = favoriEquations.map(
				(favoriEquation) => favoriEquation.toSimpleObject(),
			);

			const result = {
				favoriEquations: simpleFavoriEquations,
				numberOfEqation: numberOfEqation.value,
			};

			return new OkHttpResponse("favoriEquations.found", result);
		},
		makeResponseContract(OkHttpResponse, "favoriEquations.found", endpointSearchFavoriEquationRouteSchema),
	);
