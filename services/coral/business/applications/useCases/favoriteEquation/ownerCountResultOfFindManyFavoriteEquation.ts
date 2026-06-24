import { C } from "@duplojs/utils";
import { FavoriteEquationRepository, type PartialFavoriteEquationNameConstraint } from "@business/applications/repositories/favoriteEquation";
import type { UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialFavoriteEquationName: PartialFavoriteEquationNameConstraint;
}

export const OwnerCountResultOfFindManyFavoriteEquationUseCase = C.createUseCase(
	{ FavoriteEquationRepository },
	({
		favoriteEquationRepository,
	}) => (input: Input) => favoriteEquationRepository.countResultOfFindMany(
		input,
	),
);
