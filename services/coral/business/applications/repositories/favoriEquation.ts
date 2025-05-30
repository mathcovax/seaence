import { type UserId } from "@business/domains/common/user";
import { type FavoriEquationId, type FavoriEquationEntity, type FavoriEquationName } from "@business/domains/entities/favoriEquation";
import { createRepositoryHandler, type Int, type PositiveInt, type RepositoryBase } from "@vendors/clean";

interface InputSearchFavoriEquationPerPageWhereNameIs {
	userId: UserId;
	favoriEquationName: FavoriEquationName;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

interface InputCountFavoriEquationsByUserIdAndName {
	userId: UserId;
	favoriEquationName: FavoriEquationName;
}

export interface FavoriEquationRepository extends RepositoryBase<FavoriEquationEntity> {
	generateFavoriEquationId(): FavoriEquationId;
	deleteFavoriEquation(favoriEquation: FavoriEquationEntity): Promise<void>;
	findFavoriEquationById(favoriEquationId: FavoriEquationId): Promise<FavoriEquationEntity | null>;
	searchFavoriEquationPerPageWhereNameIs(
		input: InputSearchFavoriEquationPerPageWhereNameIs,
	): Promise<FavoriEquationEntity[]>;
	getDetailOfSearchFavoriEquations(
		input: InputCountFavoriEquationsByUserIdAndName
	): Promise<{ numberOfFavoriEquation: Int }>;
}

export const favoriEquationRepository = createRepositoryHandler<FavoriEquationRepository>();
