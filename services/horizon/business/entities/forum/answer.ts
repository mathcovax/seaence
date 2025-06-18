import { zod } from "@vendors/clean";
import { answerRules } from "@vendors/entity-rules";

export namespace Answer {
	export const content = zod
		.string()
		.min(answerRules.content.minLength)
		.max(answerRules.content.maxLength);

	export const index = zod
		.object({
			id: zod.string(),
			postId: zod.string(),
			content: content,
			authorId: zod.string(),
			authorName: zod.string(),
			createdAt: zod.string(),
		});
}
