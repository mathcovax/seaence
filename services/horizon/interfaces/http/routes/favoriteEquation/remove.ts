import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralProvider } from "@interfaces/providers/coral";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/remove-favorite-equation/{favoriteEquationId}")
	.extract({
		params: {
			favoriteEquationId: zod.string(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { user, favoriteEquationId } = pickup(["user", "favoriteEquationId"]);

			const result = await CoralProvider.removeFavoriteEquation({
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
					{ information: "favoriteEquation.removed" },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(NotFoundHttpResponse, "favoriteEquation.notfound"),
			...makeResponseContract(UnauthorizedHttpResponse, "favoriteEquation.wrongProprietary"),
		],
	)
	.handler(
		() => new NoContentHttpResponse("favoriteEquation.remove"),
		makeResponseContract(NoContentHttpResponse, "favoriteEquation.remove"),
	);
