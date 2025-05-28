import { zod } from "@vendors/clean";
import { userRules } from "@vendors/entity-rules";

export const userUsernameObjecter = zod
	.string()
	.min(userRules.username.minLength)
	.max(userRules.username.maxLength)
	.createValueObjecter("userUsername");

export const userObjecter = zod
	.object({
		id: zod.string(),
		username: userUsernameObjecter.zodSchema,
		email: zod.string(),
		lastUpdate: zod.string(),
	})
	.createValueObjecter("user");
