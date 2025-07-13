import { zod } from "@vendors/clean";

export namespace Answer {
	export const index = zod.object({
		id: zod.string(),
		postId: zod.string(),
		content: zod.string(),
		authorId: zod.string(),
		authorName: zod.string().nullable(),
		status: zod.enum(["compliant", "unprocessed", "notCompliant"]),
		createdAt: zod.string(),
	});
}
