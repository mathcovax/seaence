import { C } from "@duplojs/utils";
import { FavoriteEquationRepository } from "@business/applications/repositories/favoriteEquation";
import type { FavoriteEquation } from "@business/domains/entities/favoriteEquation";

interface Input {
	ownerFavoriteEquation: FavoriteEquation.Entity & FavoriteEquation.WithCheckedOwner;
}

export const OwnerRemoveFavoriteEquationUseCase = C.createUseCase(
	{ FavoriteEquationRepository },
	(
		{ favoriteEquationRepository },
	) => (input: Input) => favoriteEquationRepository.remove(
		input.ownerFavoriteEquation,
	),
);
