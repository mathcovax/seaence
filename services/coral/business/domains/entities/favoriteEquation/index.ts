import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../../common/user";
import { type Equation, equationObjecter } from "../../common/equation";
import { favoriteEquationRules } from "@vendors/entity-rules";

export const favoriteEquationIdObjecter = zod.string().createValueObjecter("favoriteEquationId");
export type FavoriteEquationId = GetValueObject<typeof favoriteEquationIdObjecter>;

export const favoriteEquationNameObjecter = zod
	.string()
	.min(favoriteEquationRules.name.minLength)
	.max(favoriteEquationRules.name.maxLength)
	.createValueObjecter("favoriEquationName");

export type FavoriteEquationName = GetValueObject<typeof favoriteEquationNameObjecter>;

export class FavoriteEquationEntity extends EntityHandler.create({
	id: favoriteEquationIdObjecter,
	name: favoriteEquationNameObjecter,
	userId: userIdObjecter,
	equation: equationObjecter,
	addedAt: commonDateObjecter,
}) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof FavoriteEquationEntity>,
			"addedAt"
		>,
	) {
		return new FavoriteEquationEntity({
			...params,
			addedAt: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public updateEquation(equation: Equation) {
		return this.update({
			equation,
		});
	}
}
