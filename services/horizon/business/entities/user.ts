import { createEnum, zod } from "@vendors/clean";
import { userRules } from "@vendors/entity-rules";

export namespace User {
	export const username = zod
		.string()
		.min(userRules.username.minLength)
		.max(userRules.username.maxLength);

	export const languageEnum = createEnum(["fr-FR", "en-US"]);
	export const language = zod.enum(languageEnum.toTuple());

	export const index = zod
		.object({
			id: zod.string(),
			username,
			email: zod.string(),
			language,
			lastUpdate: zod.string(),
			banned: zod.boolean(),
		});

	export const login = zod.object({
		accessToken: zod.string(),
	});
}
