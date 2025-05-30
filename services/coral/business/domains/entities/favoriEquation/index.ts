import { dateYYYYMMDDObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../../common/user";
import { equationObjecter } from "../../common/equation";

export const favoriEquationIdObjecter = zod.string().createValueObjecter("favoriEquationId");
export type FavoriEquationId = GetValueObject<typeof favoriEquationIdObjecter>;

export const favoriEquatioonNameObjecter = zod.string().createValueObjecter("favoriEquationName");
export type FavoriEquationName = GetValueObject<typeof favoriEquatioonNameObjecter>;

export class FavoriEquationEntity extends EntityHandler.create({
	id: favoriEquationIdObjecter,
	name: favoriEquatioonNameObjecter,
	userId: userIdObjecter,
	equation: equationObjecter,
	addedAt: dateYYYYMMDDObjecter,
}) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof FavoriEquationEntity>,
			"addedAt"
		>,
	) {
		return new FavoriEquationEntity({
			...params,
			addedAt: dateYYYYMMDDObjecter.unsafeCreate(new Date()),
		});
	}
}
