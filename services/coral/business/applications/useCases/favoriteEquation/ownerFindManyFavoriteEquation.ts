import { C } from "@duplojs/utils";
import { FavoriteEquationRepository, type PartialFavoriteEquationNameConstraint } from "@business/applications/repositories/favoriteEquation";
import type { UserId } from "@business/domains/common/user";

interface Input {
	partialFavoriteEquationName: PartialFavoriteEquationNameConstraint;
	userId: UserId;
	page: C.Int;
	quantityPerPage: C.PositiveInt;
}

export const OwnerFindManyFavoriteEquationUseCase = C.createUseCase(
	{ FavoriteEquationRepository },
	(
		{ favoriteEquationRepository },
	) => (input: Input) => favoriteEquationRepository.findMany(
		input,
	),
);
