import { endpointUserSchema } from "./user";

export const endpointAnswerSchema = zod.object({
	id: zod.string(),
	postId: zod.string(),
	content: zod.string(),
	author: endpointUserSchema.pick({
		id: true,
		username: true,
	}),
});
