import { usernameRule } from "@business/domains/entities/user";

export const endpointUserSchema = zod.object({
	id: zod.string(),
	email: zod.string().email(),
	username: zod.string()
		.min(usernameRule.min)
		.max(usernameRule.max),
});
