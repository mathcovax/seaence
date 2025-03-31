import { zod } from "@vendors/clean";

export const userSchema = zod.object({
	userId: zod.string(),
	username: zod.string(),
});

export type User = zod.infer<typeof userSchema>;
