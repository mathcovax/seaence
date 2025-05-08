import { articleTypeSchema } from "./common";

export const endpointSimpleSearchResultSchema = zod.object({
	score: zod.number(),
	abysBakedDocumentId: zod.string(),
	title: zod.string(),
	articleType: articleTypeSchema.array(),
	authors: zod.string().array(),
	webPublishDate: zod.string().nullable(),
	journalPublishDate: zod.string().nullable(),
	summary: zod.string().nullable(),
	keywords: zod.string().array().nullable(),
});

export type EndpointSimpleSearchResultSchema = typeof endpointSimpleSearchResultSchema["_output"];
