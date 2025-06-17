import { FavoriteEquation } from "@business/entities/favoriteEquation";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { CoralAPI } from "@interfaces/providers/coral";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-one-favorite-equation/{favoriteEquationId}")
	.extract({
		params: {
			favoriteEquationId: zod.string(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { user, favoriteEquationId } = pickup(["user", "favoriteEquationId"]);

			const result = await CoralAPI.findOneFavoriteEquation({
				userId: user.id,
				favoriteEquationId,
			});

			return match(result)
				.with(
					{ information: "favoriteEquation.notfound" },
					() => new NotFoundHttpResponse("favoriteEquation.notfound"),
				)
				.with(
					{ information: "favoriteEquation.wrongProprietary" },
					() => new UnauthorizedHttpResponse("favoriteEquation.wrongProprietary"),
				)
				.with(
					{ information: "favoriteEquation.findOne" },
					({ body }) => dropper({ favoriteEquation: body }),
				)
				.exhaustive();
		},
		["favoriteEquation"],
		[
			...makeResponseContract(NotFoundHttpResponse, "favoriteEquation.notfound"),
			...makeResponseContract(UnauthorizedHttpResponse, "favoriteEquation.wrongProprietary"),
		],
	)
	.handler(
		(pickup) => {
			const { favoriteEquation } = pickup(["favoriteEquation"]);

			return new OkHttpResponse("favoriteEquation.found", favoriteEquation);
		},
		makeResponseContract(OkHttpResponse, "favoriteEquation.found", FavoriteEquation.index),
	);
