import { bakedDocumentObjecter } from "@business/entities/bakedDocument";
import { postContentObjecter, postObjecter, postTopicObjecter } from "@business/entities/post";

export const endpointPostSchema = postObjecter.zodSchema;

export const endpointPostPageSchema = zod.object({
	post: endpointPostSchema,
	document: bakedDocumentObjecter.zodSchema.pick({
		id: true,
		title: true,
		language: true,
	}),
	quantityAnswerPerPage: zod.number(),
	notificationOfPostIsActivate: zod.boolean(),
});

export const endpointPostListPageSchema = zod.object({
	document: bakedDocumentObjecter.zodSchema.pick({
		id: true,
		title: true,
		language: true,
	}),
	totalPostCount: zod.number(),
	quantityPostPerPage: zod.number(),
});

export const endpointCreatePostPage = zod.object({
	id: zod.string(),
});

export const entrypointCreatePost = zod.object({
	topic: postTopicObjecter.zodSchema,
	content: postContentObjecter.zodSchema,
	documentId: zod.string(),
});
