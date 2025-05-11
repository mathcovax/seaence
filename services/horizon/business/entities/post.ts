import { zod } from "@vendors/clean";
import { userObjecter } from "./user";

export const postObjecter = zod
	.object({
		id: zod.string(),
		topic: zod.string(),
		content: zod.string(),
		author: userObjecter.zodSchema.pick({
			id: true,
			username: true,
		}),
		createdAt: zod.string(),
		answerCount: zod.number(),
	})
	.createValueObjecter("post");
