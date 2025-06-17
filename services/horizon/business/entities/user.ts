import { createEnum, zod } from "@vendors/clean";
import { userRules } from "@vendors/entity-rules";

export const userUsernameObjecter = zod
	.string()
	.min(userRules.username.minLength)
	.max(userRules.username.maxLength)
	.createValueObjecter("userUsername");

export const userLanguageEnum = createEnum(["fr-FR", "en-US"]);
export const userLanguageObjecter = zod.enum(userLanguageEnum.toTuple())
	.createValueObjecter("userLanguage");

export const userObjecter = zod
	.object({
		id: zod.string(),
		username: userUsernameObjecter.zodSchema,
		email: zod.string(),
		language: userLanguageObjecter.zodSchema,
		lastUpdate: zod.string(),
	})
	.createValueObjecter("user");
