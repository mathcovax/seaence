import { createEnum, type GetValueObject, zod } from "@vendors/clean";

export const userIdObjecter = zod.string().createValueObjecter("userId");
export type UserId = GetValueObject<typeof userIdObjecter>;

export const usernameObjecter = zod.string().createValueObjecter("username");
export type Username = GetValueObject<typeof usernameObjecter>;

export const userLanguageEnum = createEnum(["fr-FR", "en-US"]);

export const userObjecter = zod.object({
	id: zod.string(),
	username: usernameObjecter.zodSchema,
	email: zod.string().email(),
	language: zod.enum(userLanguageEnum.toTuple()),
}).createValueObjecter("user");
export type User = GetValueObject<typeof userObjecter>;
