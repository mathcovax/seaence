import { UsecaseHandler } from "@vendors/clean";
import { favoriteEquationRepository } from "../../repositories/favoriteEquation";
import { type UserId } from "@business/domains/common/user";
import { type Equation } from "@business/domains/common/equation";
import { FavoriteEquationEntity, type FavoriteEquationName } from "@business/domains/entities/favoriteEquation";
import { match, P } from "ts-pattern";

interface Input {
	userId: UserId;
	equation: Equation;
	favoriteEquationName: FavoriteEquationName;
}

export class UserUpsertFavoriteEquationUsecase extends UsecaseHandler.create({
	favoriteEquationRepository,
}) {
	public async execute({ userId, equation, favoriteEquationName }: Input) {
		const findedFavoriEquation = await this.favoriteEquationRepository.findOneFavoriteEquation(
			userId,
			favoriteEquationName,
		);

		const favoriEquation = match({ findedFavoriEquation })
			.with(
				{ findedFavoriEquation: P.instanceOf(FavoriteEquationEntity) },
				({ findedFavoriEquation }) => findedFavoriEquation.updateEquation(equation),
			)
			.with(
				{ findedFavoriEquation: null },
				() => FavoriteEquationEntity.create({
					id: this.favoriteEquationRepository.generateFavoriteEquationId(),
					userId,
					equation,
					name: favoriteEquationName,
				}),
			)
			.exhaustive();

		await this.favoriteEquationRepository.save(favoriEquation);

		return favoriEquation;
	}
}
