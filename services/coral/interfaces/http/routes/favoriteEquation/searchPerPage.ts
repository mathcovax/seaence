import { userIdObjecter } from "@business/domains/common/user";
import { endpointGetCountOfSearchFavoriteEquationRouteSchema, endpointSearchFavoriteEquationRouteSchema } from "@interfaces/http/schemas/favoriteEquation";
import { userCountResultOfSearchFavoriteEquationUsecase, userSearchFavoriteEquationUsecase } from "@interfaces/usecase";
import { intObjecter, positiveIntObjecter, textObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-favorite-equations")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialFavoriteEquationName: textObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialFavoriteEquationName, page, quantityPerPage } = pickup("body");

			const favoriEquations = await userSearchFavoriteEquationUsecase.execute({
				partialFavoriteEquationName,
				page,
				quantityPerPage,
				userId,
			});

			const simpleFavoriEquations = favoriEquations.map(
				(favoriEquation) => favoriEquation.toSimpleObject(),
			);

			return new OkHttpResponse("favoriEquations.found", simpleFavoriEquations);
		},
		makeResponseContract(OkHttpResponse, "favoriEquations.found", endpointSearchFavoriteEquationRouteSchema),
	);

useBuilder()
	.createRoute("POST", "/get-search-favorite-equations-count")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialFavoriteEquationName: textObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialFavoriteEquationName } = pickup("body");

			const numberOfFavoriEquation = await userCountResultOfSearchFavoriteEquationUsecase.execute({
				partialFavoriteEquationName,
				userId,
			});

			return new OkHttpResponse("favoriEquations.searchDetails", { total: numberOfFavoriEquation.value });
		},
		makeResponseContract(OkHttpResponse, "favoriEquations.searchDetails", endpointGetCountOfSearchFavoriteEquationRouteSchema),
	);
