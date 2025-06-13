import { EntityHandler, type GetValueObject, UsecaseError, UsecaseHandler } from "@vendors/clean";
import { favoriteEquationRepository } from "../../repositories/favoriteEquation";
import { FavoriteEquationEntity, type FavoriteEquationId } from "@business/domains/entities/favoriteEquation";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	favoriteEquationId: FavoriteEquationId;
}

const userFavoriteEquationObjecter = EntityHandler.createEntityObjecter(
	"userFavoriteEquation",
	FavoriteEquationEntity,
);

export type UserFavoriteEquation = GetValueObject<typeof userFavoriteEquationObjecter>;

export class UserFindFavoriteEquationByIdUsecase extends UsecaseHandler.create({
	favoriteEquationRepository,
}) {
	public async execute({ userId, favoriteEquationId }: Input) {
		const findedFavoriteEquation = await this.favoriteEquationRepository
			.findOneFavoriteEquationById(favoriteEquationId);

		if (!findedFavoriteEquation) {
			return null;
		} else if (findedFavoriteEquation.userId.value !== userId.value) {
			return new UsecaseError("wrong-proprietary", { findedFavoriteEquation });
		}

		return userFavoriteEquationObjecter.unsafeCreate(findedFavoriteEquation);
	}
}
