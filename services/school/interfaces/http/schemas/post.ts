import { zod } from "@vendors/clean";
import { endpointDocumentSchema } from "./document";
import { endpointUserSchema } from "./user";

export const endpointPostSchema = zod.object({
	id: zod.string(),
	topic: zod.string(),
	content: zod.string().nullable(),
	document: endpointDocumentSchema,
	author: endpointUserSchema,
	answerCount: zod.number().optional(),
	createdAt: zod.date().optional(),
});

export const endpointPostListSchema = zod.object({
	posts: endpointPostSchema.array(),
	totalCount: zod.number(),
	quantityPerPage: zod.number(),
});
