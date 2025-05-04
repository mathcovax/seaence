import { zod } from "@vendors/clean";
import { userSchema } from "./user";
import { documentSchema } from "./document";

export const postSchema = zod.object({
	id: zod.string(),
	topic: zod.string(),
	content: zod.string().nullable(),
	author: userSchema,
	answerCount: zod.number(),
	createdAt: zod.date(),
});

export const endpointGetPostSchema = postSchema.extend({
	document: documentSchema,
});

export const endpointGetPostsSchema = zod.object({
	posts: postSchema.array(),
	totalCount: zod.number(),
	quantityPerPage: zod.number(),
});
