import { type UserId } from "@business/domains/common/user";
import { type FavoriteEquationId, type FavoriteEquationEntity, type FavoriteEquationName } from "@business/domains/entities/favoriteEquation";
import { createRepositoryHandler, type Text, type Int, type PositiveInt, type RepositoryBase } from "@vendors/clean";

interface InputFindFavoriteEquations {
	userId: UserId;
	partialFavoriteEquationName: Text;
	page: Int;
	quantityPerPage: PositiveInt;
}

export interface FavoriteEquationRepository extends RepositoryBase<FavoriteEquationEntity> {
	generateFavoriteEquationId(): FavoriteEquationId;
	delete(favoriteEquation: FavoriteEquationEntity): Promise<void>;
	findFavoriteEquationById(favoriteEquationId: FavoriteEquationId): Promise<FavoriteEquationEntity | null>;
	findFavoriteEquation(
		userId: UserId,
		favoriteEquationName: FavoriteEquationName
	): Promise<FavoriteEquationEntity | null>;
	searchFavoriteEquations(
		input: InputFindFavoriteEquations,
	): Promise<FavoriteEquationEntity[]>;
	countResultOfSearchFavoriteEquation(
		userId: UserId,
		partialFavoriteEquationName: Text
	): Promise<Int>;
}

export const favoriteEquationRepository = createRepositoryHandler<FavoriteEquationRepository>();
