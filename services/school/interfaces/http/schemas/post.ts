import { zod } from "@vendors/clean";
import { endpointArticleSchema } from "./article";
import { endpointUserSchema } from "./user";

export const endpointPostSchema = zod.object({
	id: zod.string(),
	topic: zod.string(),
	content: zod.string().nullable(),
	article: endpointArticleSchema,
	author: endpointUserSchema,
	answerCount: zod.number().optional(),
	createdAt: zod.date().optional(),
});

export const endpointPostListSchema = zod.object({
	posts: endpointPostSchema.array(),
	totalCount: zod.number(),
	quantityPerPage: zod.number(),
});
