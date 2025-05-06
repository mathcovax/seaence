import { documentSchema } from "./document";
import { endpointUserSchema } from "./user";

export const endpointPostSchema = zod.object({
	id: zod.string(),
	topic: zod.string(),
	content: zod.string().nullable(),
	author: endpointUserSchema.pick({
		id: true,
		username: true,
	}),
	createdAt: zod.string(),
	answerCount: zod.number(),
});

export const endpointPostPageSchema = zod.object({
	post: endpointPostSchema,
	document: documentSchema.pick({
		id: true,
		title: true,
		language: true,
	}),
	quantityAnswerPerPage: zod.number(),
});

export const endpointPostListPageSchema = zod.object({
	document: documentSchema.pick({
		id: true,
		title: true,
		language: true,
	}),
	totalPostCount: zod.number(),
	quantityPostPerPage: zod.number(),
});
