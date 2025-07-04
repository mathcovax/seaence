import { createEnum, zod } from "@vendors/clean";
import { postRules } from "@vendors/entity-rules";

export namespace Post {
	export const topic = zod
		.string()
		.min(postRules.topic.minLength)
		.max(postRules.topic.maxLength);

	export const content = zod
		.string()
		.min(postRules.content.minLength)
		.max(postRules.content.maxLength);

	export const id = zod.string();

	export const statusEnum = createEnum([
		"compliant",
		"unprocessed",
		"notCompliant",
	]);

	export const status = zod.enum(statusEnum.toTuple());

	export const index = zod
		.object({
			id,
			status,
			topic: topic,
			content: content,
			authorId: zod.string(),
			authorName: zod.string(),
			createdAt: zod.string(),
			answerCount: zod.number(),
		});

	export const createdPost = zod
		.object({
			id,
		});
}
