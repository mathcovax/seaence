export const endpointAnswerSchema = zod.object({
	id: zod.string(),
	postId: zod.string(),
	content: zod.string(),
	authorId: zod.string(),
	authorName: zod.string(),
	createdAt: zod.date(),
});
