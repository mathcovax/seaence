import { zod } from "@vendors/clean";
import { nodeSameRawDocumentIdObjecter, postStatusEnum } from "@business/domains/entities/post";

export const endpointPostSchema = zod.object({
	id: zod.string(),
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.zodSchema,
	status: zod.enum(postStatusEnum.toTuple()),
	topic: zod.string(),
	content: zod.string(),
	authorId: zod.string(),
	authorName: zod.string(),
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
