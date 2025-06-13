import { userIdObjecter } from "@business/domains/common/user";
import { endpointFindManyFavoriteEquationDetailsSchema, endpointFindManyFavoriteEquationNameSchema } from "@interfaces/http/schemas/favoriteEquation";
import { userCountResultOfFindManyFavoriteEquationUsecase, userFindManyFavoriteEquationUsecase } from "@interfaces/usecase";
import { intObjecter, positiveIntObjecter, textObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/find-many-favorite-equation-name")
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

			const favoriEquations = await userFindManyFavoriteEquationUsecase.execute({
				partialFavoriteEquationName,
				page,
				quantityPerPage,
				userId,
			});

			const favoriEquationNames = favoriEquations.map(
				(favoriEquation) => favoriEquation.name.value,
			);

			return new OkHttpResponse("favoriteEquation.name.findMany", favoriEquationNames);
		},
		makeResponseContract(
			OkHttpResponse,
			"favoriteEquation.name.findMany",
			endpointFindManyFavoriteEquationNameSchema,
		),
	);

useBuilder()
	.createRoute("POST", "/find-many-favorite-equation-details")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialFavoriteEquationName: textObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialFavoriteEquationName } = pickup("body");

			const numberOfFavoriEquation = await userCountResultOfFindManyFavoriteEquationUsecase.execute({
				partialFavoriteEquationName,
				userId,
			});

			return new OkHttpResponse("favoriEquation.findMany.details", { total: numberOfFavoriEquation.value });
		},
		makeResponseContract(
			OkHttpResponse,
			"favoriEquation.findMany.details",
			endpointFindManyFavoriteEquationDetailsSchema,
		),
	);
