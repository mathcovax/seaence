import { type FavoriteEquation } from "@business/domains/entities/favoriteEquation";
import { type Unwrap } from "@duplojs/utils";

export interface MongoFavoriteEquation {
	id: string;
	userId: string;
	name: string;
	equation: Unwrap<FavoriteEquation.Equation>;
	addedAt: Date;
	updateAt: Date;
}
