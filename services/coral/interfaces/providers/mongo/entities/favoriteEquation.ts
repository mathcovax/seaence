import { type EntityToSimpleObject } from "@vendors/clean";
import { type FavoriteEquationEntity } from "@business/domains/entities/favoriteEquation";

export interface MongoFavoriteEquation extends EntityToSimpleObject<typeof FavoriteEquationEntity> {}
