import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { CoralAPI } from "@interfaces/providers/coral";
import { favoriteEquationRules } from "@vendors/entity-rules";
import { operatorContentSchema } from "@vendors/types-advanced-query";

useMustBeConnectedBuilder()
	.createRoute("POST", "/upsert-favorite-equation")
	.extract({
		body: zod.object({
			favoriteEquationName: zod.string()
				.min(favoriteEquationRules.name.minLength)
				.max(favoriteEquationRules.name.maxLength),
			equation: operatorContentSchema,
		}),
	})
	.handler(
		async(pickup) => {
			const { user } = pickup(["user"]);
			const { favoriteEquationName, equation } = pickup("body");

			await CoralAPI.upsertFavoriteEquation({
				userId: user.id,
				favoriteEquationName,
				equation,
			});

			return new NoContentHttpResponse("favoriteEquation.upsert");
		},
		makeResponseContract(NoContentHttpResponse, "favoriteEquation.upsert"),
	);
