import { equationObjecter } from "@business/domains/common/equation";
import { userIdObjecter } from "@business/domains/common/user";
import { favoriEquationIdObjecter, favoriEquatioonNameObjecter } from "@business/domains/entities/favoriEquation";

export const endpointGetFavoriEquationRoute = zod.object({
	id: favoriEquationIdObjecter.zodSchema,
	name: favoriEquatioonNameObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	equation: equationObjecter.zodSchema,
});
