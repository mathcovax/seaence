import { equationObjecter } from "@business/domains/common/equation";
import { userIdObjecter } from "@business/domains/common/user";
import { favoriteEquationIdObjecter, favoriteEquationNameObjecter } from "@business/domains/entities/favoriteEquation";
import { commonDateObjecter } from "@vendors/clean";

const favoriteEquationSchema = zod.object({
	id: favoriteEquationIdObjecter.zodSchema,
	name: favoriteEquationNameObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	equation: equationObjecter.zodSchema,
	addedAt: commonDateObjecter.zodSchema,
});

export const endpointFindOneFavoriteEquationSchema = favoriteEquationSchema;

export const endpointFindManyFavoriteEquationNameSchema = zod.string().array();

export const endpointFindManyFavoriteEquationDetailsSchema = zod.object({
	total: zod.number(),
});
