import { zod } from "@vendors/clean";

export namespace Post {
	export const index = zod.object({
		id: zod.string(),
		nodeSameRawDocumentId: zod.string(),
		topic: zod.string(),
		content: zod.string(),
		authorId: zod.string(),
		authorName: zod.string(),
		answerCount: zod.number(),
		createdAt: zod.string(),
	});

	export const moderationPage = zod.object({
		post: index,
		unprocessedTotalCount: zod.number(),
	});
}
