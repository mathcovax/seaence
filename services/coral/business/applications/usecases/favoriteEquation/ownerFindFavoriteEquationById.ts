import { asyncPipe, C, E } from "@duplojs/utils";
import { FavoriteEquationRepository } from "@business/applications/repositories/favoriteEquation";
import type { UserId } from "@business/domains/common/user";
import { FavoriteEquation } from "@business/domains/entities/favoriteEquation";

interface Input {
	userId: UserId;
	favoriteEquationId: FavoriteEquation.Id;
}

export const OwnerFindFavoriteEquationByIdUseCase = C.createUseCase(
	{ FavoriteEquationRepository },
	(
		{ favoriteEquationRepository },
	) => async(input: Input) => asyncPipe(
		favoriteEquationRepository.findOneById(
			input.favoriteEquationId,
		),
		E.whenIsRight(
			(favoriteEquation) => C.equal(favoriteEquation.userId, input.userId)
				? E.left("wrong-proprietary", favoriteEquation)
				: E.success(
					FavoriteEquation.WithCheckedOwner.append(favoriteEquation),
				),
		),
	),
);
