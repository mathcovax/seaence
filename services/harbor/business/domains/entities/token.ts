import { EntityHandler, type GetValueObject, zod, type GetEntityProperties } from "@vendors/clean";

export const tokenContentObjecter = zod.string().createValueObjecter("tokenContent");

export type TokenContent = GetValueObject<typeof tokenContentObjecter>;

export class TokenEntity extends EntityHandler.create({
	content: tokenContentObjecter,
}) {
	public static create(params: GetEntityProperties<typeof TokenEntity>) {
		return new TokenEntity(params);
	}
}
