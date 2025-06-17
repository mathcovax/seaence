import { zod } from "@vendors/clean";
import { userSchema } from "./user";
import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/post";

export const endpointPostSchema = zod.object({
	id: zod.string(),
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.zodSchema,
	topic: zod.string(),
	content: zod.string(),
	author: userSchema,
	answerCount: zod.number(),
	createdAt: zod.date(),
});

export const endpointPostsDetails = zod.object({
	totalCount: zod.number(),
});

export const endpointUnprocessedPostDetails = zod.object({
	totalCount: zod.number(),
});

export const endpointCreatePost = zod.object({
	id: zod.string(),
});
