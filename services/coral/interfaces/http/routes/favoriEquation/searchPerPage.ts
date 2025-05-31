import { userIdObjecter } from "@business/domains/common/user";
import { favoriEquatioonNameObjecter } from "@business/domains/entities/favoriEquation";
import { endpointGetCountOfSearchFavoriEquationRouteSchema, endpointSearchFavoriEquationRouteSchema } from "@interfaces/http/schemas/favoriEquation";
import { countResultOfFindFavoriEquationUsecase, searchFavoriEquationUsecase } from "@interfaces/usecase";
import { positiveIntObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-favori-equations")
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
	.createRoute("POST", "/get-search-favori-equations-count")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialNameFavoriEquation: favoriEquatioonNameObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialNameFavoriEquation } = pickup("body");

			const numberOfFavoriEquation = await countResultOfFindFavoriEquationUsecase.execute({
				favoriEquationName: partialNameFavoriEquation,
				userId,
			});

			return new OkHttpResponse("favoriEquations.searchDetails", numberOfFavoriEquation.value);
		},
		makeResponseContract(OkHttpResponse, "favoriEquations.searchDetails", endpointGetCountOfSearchFavoriEquationRouteSchema),
	);
