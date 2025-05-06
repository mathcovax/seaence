export const endpointUserSchema = zod.object({
	id: zod.string(),
	username: zod.string(),
	email: zod.string(),
});
