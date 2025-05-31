import { type UserId } from "@business/domains/common/user";
import { type FavoriEquationId, type FavoriEquationEntity, type FavoriEquationName } from "@business/domains/entities/favoriEquation";
import { createRepositoryHandler, type Text, type Int, type PositiveInt, type RepositoryBase } from "@vendors/clean";

interface InputFindFavoriEquations {
	userId: UserId;
	partialFavoriEquationName: Text;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

export interface FavoriEquationRepository extends RepositoryBase<FavoriEquationEntity> {
	generateFavoriEquationId(): FavoriEquationId;
	delete(favoriEquation: FavoriEquationEntity): Promise<void>;
	findFavoriEquation(
		userId: UserId,
		favoriEquationName: FavoriEquationName
	): Promise<FavoriEquationEntity | null>;
	findFavoriEquations(
		input: InputFindFavoriEquations,
	): Promise<FavoriEquationEntity[]>;
	countResultOfFindFavoriEquation(
		userId: UserId,
		partialsFavoriEquationName: Text
	): Promise<Int>;
}

export const favoriEquationRepository = createRepositoryHandler<FavoriEquationRepository>();
