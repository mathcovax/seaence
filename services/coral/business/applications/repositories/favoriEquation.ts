import { type UserId } from "@business/domains/common/user";
import { type FavoriEquationId, type FavoriEquationEntity, type FavoriEquationName } from "@business/domains/entities/favoriEquation";
import { createRepositoryHandler, type Int, type PositiveInt, type RepositoryBase } from "@vendors/clean";

interface InputFindFavoriEquations {
	userId: UserId;
	favoriEquationName: FavoriEquationName;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

interface InputCountResultOfFindFavoriEquation {
	userId: UserId;
	favoriEquationName: FavoriEquationName;
}

export interface FavoriEquationRepository extends RepositoryBase<FavoriEquationEntity> {
	generateFavoriEquationId(): FavoriEquationId;
	deleteFavoriEquation(favoriEquation: FavoriEquationEntity): Promise<void>;
	findFavoriEquationById(favoriEquationId: FavoriEquationId): Promise<FavoriEquationEntity | null>;
	findFavoriEquations(
		input: InputFindFavoriEquations,
	): Promise<FavoriEquationEntity[]>;
	countResultOfFindFavoriEquation(
		input: InputCountResultOfFindFavoriEquation
	): Promise<Int>;
}

export const favoriEquationRepository = createRepositoryHandler<FavoriEquationRepository>();
