import { equationObjecter } from "@business/domains/common/equation";
import { userIdObjecter } from "@business/domains/common/user";
import { favoriEquationIdObjecter, favoriEquatioonNameObjecter } from "@business/domains/entities/favoriEquation";

const favoriEquationSchema = zod.object({
	id: favoriEquationIdObjecter.zodSchema,
	name: favoriEquatioonNameObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	equation: equationObjecter.zodSchema,
});

export const endpointGetFavoriEquationRouteSchema = favoriEquationSchema;

export const endpointSearchFavoriEquationRouteSchema = favoriEquationSchema.array();

export const endpointGetDetailOfSearchFavoriEquationRouteSchema = zod.object({
	numberOfFavoriEquation: zod.number(),
});
