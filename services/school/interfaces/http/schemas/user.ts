export const userSchema = zod.object({
	id: zod.string(),
	username: zod.string(),
});
