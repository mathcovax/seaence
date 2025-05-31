import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../../common/user";
import { equationObjecter } from "../../common/equation";
import { favoriEquationRules } from "@vendors/entity-rules";

export const favoriEquationIdObjecter = zod.string().createValueObjecter("favoriEquationId");
export type FavoriEquationId = GetValueObject<typeof favoriEquationIdObjecter>;

export const favoriEquatioonNameObjecter = zod
	.string()
	.min(favoriEquationRules.name.minLength)
	.max(favoriEquationRules.name.maxLength)
	.createValueObjecter("favoriEquationName");

export type FavoriEquationName = GetValueObject<typeof favoriEquatioonNameObjecter>;

export class FavoriEquationEntity extends EntityHandler.create({
	id: favoriEquationIdObjecter,
	name: favoriEquatioonNameObjecter,
	userId: userIdObjecter,
	equation: equationObjecter,
	addedAt: commonDateObjecter,
}) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof FavoriEquationEntity>,
			"addedAt"
		>,
	) {
		return new FavoriEquationEntity({
			...params,
			addedAt: commonDateObjecter.unsafeCreate(new Date()),
		});
	}
}
