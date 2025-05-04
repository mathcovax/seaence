import { documentSchema } from "./document";
import { endpointUserSchema } from "./user";

export const endpointPostSchema = zod.object({
	id: zod.string(),
	topic: zod.string(),
	content: zod.string().nullable(),
	document: documentSchema.pick({
		id: true,
		title: true,
	}),
	author: endpointUserSchema,
	answerCount: zod.number(),
	createdAt: zod.string(),

});

export const endpointPostListSchema = zod.object({
	postList: zod.object({
		posts: endpointPostSchema
			.omit({
				document: true,
			})
			.array(),
		totalCount: zod.number(),
		quantityPerPage: zod.number(),
	}),
	document: documentSchema.pick({
		id: true,
		title: true,
	}),
});
