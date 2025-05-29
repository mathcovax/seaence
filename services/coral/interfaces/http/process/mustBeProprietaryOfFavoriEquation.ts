import { userIdObjecter } from "@business/domains/common/user";
import { favoriEquationIdObjecter } from "@business/domains/entities/favoriEquation";
import { IWantFavoriEquationExistById, IWantUserIsProprietaryOfFavoriEquation } from "../checkers/favoriEquation";

const mustBeProprietaryOfFavoriEquation = createProcess("mustBeProprietaryOdFavoriEquation")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			favoriEquationId: favoriEquationIdObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		IWantFavoriEquationExistById,
		(pickup) => pickup("body").favoriEquationId,
	)
	.presetCheck(
		IWantUserIsProprietaryOfFavoriEquation,
		(pickup) => ({
			userId: pickup("body").userId,
			favoriEquation: pickup("favoriEquation"),
		}),
	)
	.exportation(["favoriEquation"]);

export function mustBeProprietaryOfFavoriEquationRouteBuilder() {
	return useBuilder()
		.preflight(
			mustBeProprietaryOfFavoriEquation,
			{
				pickup: ["favoriEquation"],
			},
		);
}
