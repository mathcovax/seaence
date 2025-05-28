import { zod } from "@vendors/clean";
import { userObjecter } from "./user";
import { postRules } from "@vendors/entity-rules";

export const postTopicObjecter = zod
	.string()
	.min(postRules.topic.minLength)
	.max(postRules.topic.maxLength)
	.createValueObjecter("postTopic");

export const postContentObjecter = zod
	.string()
	.min(postRules.content.minLength)
	.max(postRules.content.maxLength)
	.createValueObjecter("postContent");

export const postObjecter = zod
	.object({
		id: zod.string(),
		topic: postTopicObjecter.zodSchema,
		content: postContentObjecter.zodSchema,
		author: userObjecter.zodSchema.pick({
			id: true,
			username: true,
		}),
		createdAt: zod.string(),
		answerCount: zod.number(),
	})
	.createValueObjecter("post");
