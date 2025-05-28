import { type EntityToSimpleObject } from "@vendors/clean";
import { type FavoriEquationEntity } from "@business/domains/entities/favoriEquation";

export interface MongoFavoriEquation extends EntityToSimpleObject<typeof FavoriEquationEntity> {
	createdAt: Date;
}
