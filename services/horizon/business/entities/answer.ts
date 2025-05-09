import { zod } from "@vendors/clean";
import { userObjecter } from "./user";

export const answerObjecter = zod
	.object({
		id: zod.string(),
		postId: zod.string(),
		content: zod.string(),
		author: userObjecter.zodSchema.pick({
			id: true,
			username: true,
		}),
	})
	.createValueObjecter("answer");
