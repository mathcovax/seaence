import { zod } from "@vendors/clean";
import { userObjecter } from "./user";
import { answerRules } from "@vendors/entity-rules";

const answerContentObjecter = zod
	.string()
	.min(answerRules.content.minLength)
	.max(answerRules.content.maxLength)
	.createValueObjecter("answerContent");

export const answerObjecter = zod
	.object({
		id: zod.string(),
		postId: zod.string(),
		content: answerContentObjecter.zodSchema,
		author: userObjecter.zodSchema.pick({
			id: true,
			username: true,
		}),
		createdAt: zod.string(),
	})
	.createValueObjecter("answer");
