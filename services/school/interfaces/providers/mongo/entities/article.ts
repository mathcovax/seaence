export const articleSchema = zod.object({
	articleId: zod.string(),
	title: zod.string(),
	content: zod.string(),
});

export type Article = Zod.infer<typeof articleSchema>;
