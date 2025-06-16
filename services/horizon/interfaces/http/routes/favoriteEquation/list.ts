import { FavoriteEquation } from "@business/entities/favoriteEquation";
import { favoritEquationConfig } from "@interfaces/configs/favoritEquation";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { CoralAPI } from "@interfaces/providers/coral";
import { favoriteEquationRules } from "@vendors/entity-rules";

useMustBeConnectedBuilder()
	.createRoute("POST", "/favorite-equation-name-list")
	.extract({
		body: {
			partialFavoriteEquationName: zod.string().max(favoriteEquationRules.name.maxLength),
			page: zod.number().min(favoritEquationConfig.findMany.offsetPage),
		},
	})
	.handler(
		async(pickup) => {
			const { user, page, partialFavoriteEquationName } = pickup(["user", "partialFavoriteEquationName", "page"]);

			const { body: favoriteEquationNames } = await CoralAPI.findManyFavoriteEquationName({
				userId: user.id,
				partialFavoriteEquationName,
				page: page - favoritEquationConfig.findMany.offsetPage,
				quantityPerPage: favoritEquationConfig.findMany.quantityPerPage,
			});

			return new OkHttpResponse(
				"favoriteEquationNameList.found",
				favoriteEquationNames,
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"favoriteEquationNameList.found",
			FavoriteEquation.nameList,
		),
	);

useMustBeConnectedBuilder()
	.createRoute("POST", "/favorite-equation-list-details")
	.extract({
		body: {
			partialFavoriteEquationName: zod.string().max(favoriteEquationRules.name.maxLength),
		},
	})
	.handler(
		async(pickup) => {
			const { user, partialFavoriteEquationName } = pickup(["user", "partialFavoriteEquationName"]);

			const { body: details } = await CoralAPI.findManyFavoriteEquationDetails({
				userId: user.id,
				partialFavoriteEquationName,
			});

			return new OkHttpResponse(
				"favoriteEquationListDetails.found",
				{
					total: details.total,
					quantityPerPage: favoritEquationConfig.findMany.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "favoriteEquationListDetails.found", FavoriteEquation.listDetails),
	);
