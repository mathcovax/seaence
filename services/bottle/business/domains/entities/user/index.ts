import { EntityHandler, createEnum, type GetValueObject, zod, type GetEntityProperties } from "@vendors/clean";

export const userIdObjecter = zod.string().createValueObjecter("userId");
export type UserId = GetValueObject<typeof userIdObjecter>;

export const usernameObjecter = zod.string().createValueObjecter("username");
export type Username = GetValueObject<typeof usernameObjecter>;

export const userEmailObjecter = zod.string().email().createValueObjecter("userEmail");
export type UserEmail = GetValueObject<typeof userEmailObjecter>;

export const userLanguageEnum = createEnum(["fr-FR", "en-US"]);
export const userLanguageObjecter = zod.enum(userLanguageEnum.toTuple()).createValueObjecter("userLanguage");
export type UserLanguage = GetValueObject<typeof userLanguageObjecter>;

export class UserEntity extends EntityHandler.create({
	id: userIdObjecter,
	username: usernameObjecter,
	email: userEmailObjecter,
	language: userLanguageObjecter,
}) {
	public static create(params: GetEntityProperties<typeof UserEntity>) {
		return new UserEntity(params);
	}

	public updateInfo(params: Omit<
		GetEntityProperties<typeof UserEntity>,
		"id"
	>) {
		return this.update(params);
	}
}
