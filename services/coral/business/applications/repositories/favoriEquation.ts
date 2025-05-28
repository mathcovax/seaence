import { type FavoriEquationId, type FavoriEquationEntity } from "@business/domains/entities/favoriEquation";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface FavoriEquationRepository extends RepositoryBase<FavoriEquationEntity> {
	generateFavoriEquationId(): FavoriEquationId;
	deleteFavoriEquation(favoriEquation: FavoriEquationEntity): Promise<void>;
	findFavoriEquationById(favoriEquationId: FavoriEquationId): Promise<FavoriEquationEntity | null>;
}

export const favoriEquationRepository = createRepositoryHandler<FavoriEquationRepository>();
