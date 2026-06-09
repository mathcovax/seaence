import { asyncPipe, C, E } from "@duplojs/utils";
import { FavoriteEquationRepository } from "@business/applications/repositories/favoriteEquation";
import type { UserId } from "@business/domains/common/user";
import { FavoriteEquation } from "@business/domains/entities/favoriteEquation";

interface Input {
	userId: UserId;
	equation: FavoriteEquation.Equation;
	favoriteEquationName: FavoriteEquation.Name;
}

export const OwnerUpsertFavoriteEquationUseCase = C.createUseCase(
	{ FavoriteEquationRepository },
	(
		{ favoriteEquationRepository },
	) => (input: Input) => asyncPipe(
		favoriteEquationRepository.findByName(input),
		E.whenIsRight(
			(entity) => FavoriteEquation.updateEquation(
				entity,
				input.equation,
			),
		),
		E.whenIsLeft(
			() => FavoriteEquation.create({
				id: favoriteEquationRepository.generateId(),
				name: input.favoriteEquationName,
				userId: input.userId,
				equation: input.equation,
			}),
		),
		favoriteEquationRepository.save,
	),
);
