import { type UserId } from "@business/domains/common/user";
import { type FavoriEquationEntity, type FavoriEquationId } from "@business/domains/entities/favoriEquation";
import { type GetTypeInput } from "@duplojs/core";
import { findEquationInFavoriByIdUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

export const inputFavoriEquationExist = createTypeInput<{
	favoriEquationId: FavoriEquationId;
}>();

export const favoriEquationExistChecker = createChecker("favoriEquationExistCheck")
	.handler(
		async(input: GetTypeInput<typeof inputFavoriEquationExist>, dropper) => {
			const favoriEquation = await match(input)
				.with(
					{ inputName: "favoriEquationId" },
					({ value }) => findEquationInFavoriByIdUsecase.execute({ favoriEquationId: value }),
				)
				.exhaustive();

			if (!favoriEquation) {
				return dropper("favoriEquation.notfound", null);
			} else {
				return dropper("favoriEquation.exist", favoriEquation);
			}
		},
	);

export const IWantFavoriEquationExistById = createPresetChecker(
	favoriEquationExistChecker,
	{
		result: "favoriEquation.exist",
		catch: () => new NotFoundHttpResponse("favoriEquation.notfound"),
		transformInput: inputFavoriEquationExist.favoriEquationId,
		indexing: "favoriEquation",
	},
);

interface InputUserIsProprietaryOfFavoriEquation {
	userId: UserId;
	favoriEquation: FavoriEquationEntity;
}

export const userIsProprietaryOfFavoriEquation = createChecker("userIsProprietaryOfFavoriEquation")
	.handler(
		(input: InputUserIsProprietaryOfFavoriEquation, dropper) => {
			const { userId, favoriEquation } = input;

			if (favoriEquation.userId !== userId) {
				return dropper("favoriEquation.notproprietary", null);
			}

			return dropper("favoriEquation.proprietary", favoriEquation);
		},
	);

export const IWantUserIsProprietaryOfFavoriEquation = createPresetChecker(
	userIsProprietaryOfFavoriEquation,
	{
		result: "favoriEquation.proprietary",
		catch: () => new ForbiddenHttpResponse("favoriEquation.notproprietary"),
		indexing: "favoriEquation",
	},
);
