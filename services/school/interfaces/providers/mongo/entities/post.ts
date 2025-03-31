export const postSchema = zod.object({
	postId: zod.string(),
	topic: zod.string(),
	content: zod.string(),
	articleId: zod.string(),
	creator: zod.object({
		userId: zod.string(),
		username: zod.string(),
	}),
});

export type Post = Zod.infer<typeof postSchema>;
