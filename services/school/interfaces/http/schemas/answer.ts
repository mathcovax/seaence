import { userSchema } from "./user";

export const endpointAnswerSchema = zod.object({
	id: zod.string(),
	postId: zod.string(),
	content: zod.string(),
	author: userSchema,
	createdAt: zod.date(),
});
