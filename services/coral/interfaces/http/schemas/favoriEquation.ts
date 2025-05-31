import { equationObjecter } from "@business/domains/common/equation";
import { userIdObjecter } from "@business/domains/common/user";
import { favoriEquationIdObjecter, favoriEquatioonNameObjecter } from "@business/domains/entities/favoriEquation";
import { dateYYYYMMDDObjecter } from "@vendors/clean";

const favoriEquationSchema = zod.object({
	id: favoriEquationIdObjecter.zodSchema,
	name: favoriEquatioonNameObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	equation: equationObjecter.zodSchema,
	addedAt: dateYYYYMMDDObjecter.zodSchema,
});

export const endpointGetFavoriEquationRouteSchema = favoriEquationSchema;

export const endpointSearchFavoriEquationRouteSchema = favoriEquationSchema.array();

export const endpointGetCountOfSearchFavoriEquationRouteSchema = zod.number();
