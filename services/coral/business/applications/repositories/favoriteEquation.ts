import { C } from "@duplojs/utils";
import type { UserId } from "@business/domains/common/user";
import { FavoriteEquation } from "@business/domains/entities/favoriteEquation";

export const PartialFavoriteEquationNameConstraint = C.createConstraintsSet(
	C.String,
	[FavoriteEquation.Name.getConstraint("string-max-350")],
);
export type PartialFavoriteEquationNameConstraint = C.GetConstraints<
		typeof PartialFavoriteEquationNameConstraint
>;

export interface FavoriteEquationRepository {
	findMany(
		params: {
			partialFavoriteEquationName: PartialFavoriteEquationNameConstraint;
			userId: UserId;
			page: C.Int;
			quantityPerPage: C.PositiveInt;
		},
	): Promise<FavoriteEquation.Entity[]>;
	countResultOfFindMany(
		params: {
			userId: UserId;
			partialFavoriteEquationName: PartialFavoriteEquationNameConstraint;
		},
	): Promise<C.Int>;
	findOneById(
		id: FavoriteEquation.Id,
	): Promise<C.Maybe<FavoriteEquation.Entity>>;
	remove(
		favoriteEquation: FavoriteEquation.Entity,
	): Promise<void>;
	findByName(
		params: {
			userId: UserId;
			favoriteEquationName: FavoriteEquation.Name;
		}
	): Promise<C.Maybe<FavoriteEquation.Entity>>;
	generateId(): FavoriteEquation.Id;
	save(entity: FavoriteEquation.Entity): Promise<FavoriteEquation.Entity>;
	deleteAllByUserId(userId: UserId): Promise<void>;
}

export const FavoriteEquationRepository = C.createRepository<FavoriteEquationRepository>();
