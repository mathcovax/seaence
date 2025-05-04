import { zod } from "@vendors/clean";
import { userSchema } from "./user";
import { nodeDocumentIdObjecter } from "@business/domains/entities/post";

export const postSchema = zod.object({
	id: zod.string(),
	topic: zod.string(),
	content: zod.string().nullable(),
	author: userSchema,
	answerCount: zod.number(),
	createdAt: zod.date(),
});

export const endpointGetPostSchema = postSchema.extend({
	nodeDocumentId: nodeDocumentIdObjecter.zodSchema,
});

export const endpointGetPostsSchema = zod.object({
	posts: postSchema.array(),
	totalCount: zod.number(),
	quantityPerPage: zod.number(),
});
