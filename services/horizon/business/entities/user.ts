import { zod } from "@vendors/clean";

export const userObjecter = zod
	.object({
		id: zod.string(),
		username: zod.string(),
		email: zod.string(),
		lastUpdate: zod.string(),
	})
	.createValueObjecter("user");
