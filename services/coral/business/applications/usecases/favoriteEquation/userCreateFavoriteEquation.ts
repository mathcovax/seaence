import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { favoriteEquationRepository } from "../../repositories/favoriteEquation";
import { type UserId } from "@business/domains/common/user";
import { type Equation } from "@business/domains/common/equation";
import { FavoriteEquationEntity, type FavoriteEquationName } from "@business/domains/entities/favoriteEquation";

interface Input {
	userId: UserId;
	equation: Equation;
	favoriteEquationName: FavoriteEquationName;
}

export class UserCreateFavoriteEquationUsecase extends UsecaseHandler.create({
	favoriteEquationRepository,
}) {
	public async execute({ userId, equation, favoriteEquationName }: Input) {
		const findedFavoriEquation = await this.favoriteEquationRepository.findFavoriteEquation(
			userId,
			favoriteEquationName,
		);

		if (findedFavoriEquation) {
			return new UsecaseError("favori-equation-name-already-use", { findedFavoriEquation });
		}

		const favoriEquation = FavoriteEquationEntity.create({
			id: this.favoriteEquationRepository.generateFavoriteEquationId(),
			userId,
			equation,
			name: favoriteEquationName,
		});

		await this.favoriteEquationRepository.save(favoriEquation);

		return favoriEquation;
	}
}
