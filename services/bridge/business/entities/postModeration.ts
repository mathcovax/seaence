import { zod } from "@vendors/clean";

export namespace PostModeration {
	export const index = zod.object({
		post: zod.object(
			{
				id: zod.string(),
				nodeSameRawDocumentId: zod.string(),
				topic: zod.string(),
				content: zod.string(),
				author: zod.object(
					{
						id: zod.string(),
						username: zod.string(),
					},
				),
				answerCount: zod.number(),
				createdAt: zod.string(),
			},
		),
		unprocessedTotalCount: zod.number(),
	});
}
