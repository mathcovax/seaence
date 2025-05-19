import { bakedDocumentObjecter } from "@business/entities/bakedDocument";
import { postObjecter } from "@business/entities/post";
import { postConfig } from "@interfaces/configs/post";

export const endpointPostSchema = postObjecter.zodSchema;

export const endpointPostPageSchema = zod.object({
	post: endpointPostSchema,
	document: bakedDocumentObjecter.zodSchema.pick({
		id: true,
		title: true,
		language: true,
	}),
	quantityAnswerPerPage: zod.number(),
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
	topic: zod.string()
		.max(postConfig.create.topic.maxLength)
		.min(postConfig.create.topic.minLength),
	content: zod.string()
		.max(postConfig.create.content.maxLength)
		.min(postConfig.create.content.minLength),
	documentId: zod.string(),
});
