export const endpointArticleSchema = zod.object({
	id: zod.string(),
	title: zod.string(),
});
