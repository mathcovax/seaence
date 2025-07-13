import { createEnum, zod } from "@vendors/clean";
import { answerRules } from "@vendors/entity-rules";

export namespace Answer {
	export const content = zod
		.string()
		.min(answerRules.content.minLength)
		.max(answerRules.content.maxLength);

	export const statusEnum = createEnum([
		"compliant",
		"unprocessed",
		"notCompliant",
	]);

	export const status = zod.enum(statusEnum.toTuple());

	export const index = zod
		.object({
			id: zod.string(),
			postId: zod.string(),
			status,
			content,
			authorId: zod.string(),
			authorName: zod.string().nullable(),
			createdAt: zod.string(),
		});

	export const notCompliantContent = "**********";
}
