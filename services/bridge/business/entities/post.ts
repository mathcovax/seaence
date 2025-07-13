import { zod } from "@vendors/clean";

export namespace Post {
	export const index = zod.object({
		id: zod.string(),
		nodeSameRawDocumentId: zod.string(),
		topic: zod.string(),
		content: zod.string(),
		authorId: zod.string(),
		authorName: zod.string().nullable(),
		answerCount: zod.number(),
		createdAt: zod.string(),
	});
}
