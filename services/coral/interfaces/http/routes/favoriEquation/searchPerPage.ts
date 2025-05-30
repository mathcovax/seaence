import { userIdObjecter } from "@business/domains/common/user";
import { favoriEquatioonNameObjecter } from "@business/domains/entities/favoriEquation";
import { endpointGetDetailOfSearchFavoriEquationRouteSchema, endpointSearchFavoriEquationRouteSchema } from "@interfaces/http/schemas/favoriEquation";
import { getDetailOfSearchFavoriEquationUsecase, searchFavoriEquationUsecase } from "@interfaces/usecase";
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

			const favoriEquations = await searchFavoriEquationUsecase.execute({
				favoriEquationName: partialNameFavoriEquation,
				page,
				quantityPerPage,
				userId,
			});

			const simpleFavoriEquations = favoriEquations.map(
				(favoriEquation) => favoriEquation.toSimpleObject(),
			);

			return new OkHttpResponse("favoriEquations.found", simpleFavoriEquations);
		},
		makeResponseContract(OkHttpResponse, "favoriEquations.found", endpointSearchFavoriEquationRouteSchema),
	);

useBuilder()
	.createRoute("POST", "/get-search-favori-equations-details ")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialNameFavoriEquation: favoriEquatioonNameObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialNameFavoriEquation } = pickup("body");

			const { numberOfFavoriEquation } = await getDetailOfSearchFavoriEquationUsecase.execute({
				favoriEquationName: partialNameFavoriEquation,
				userId,
			});

			const result = {
				numberOfFavoriEquation: numberOfFavoriEquation.value,
			};

			return new OkHttpResponse("favoriEquations.searchDetails", result);
		},
		makeResponseContract(OkHttpResponse, "favoriEquations.searchDetails", endpointGetDetailOfSearchFavoriEquationRouteSchema),
	);
