export const answerSchema = zod.object({
	answerId: zod.string(),
	postId: zod.string(),
	content: zod.string(),
	responderId: zod.string(),
});

export type Answer = Zod.infer<typeof answerSchema>;
