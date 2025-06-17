import { userLanguageObjecter } from "@business/domains/entities/user";

export const endpointUserSchema = zod.object({
	id: zod.string(),
	email: zod.string().email(),
	username: zod.string(),
	lastUpdate: zod.date(),
	language: userLanguageObjecter.zodSchema,
	banned: zod.boolean(),
});
