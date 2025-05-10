import { articleTypeSchema } from "./common";

export const endpointSimpleSearchResultSchema = zod.object({
	score: zod.number(),
	bakedDocumentId: zod.string(),
	title: zod.string(),
	articleTypes: articleTypeSchema.array(),
	authors: zod.string().array(),
	webPublishDate: zod.string().nullable(),
	journalPublishDate: zod.string().nullable(),
	summary: zod.string().nullable(),
	keywords: zod.string().array().nullable(),
});

export type EndpointSimpleSearchResultSchema = typeof endpointSimpleSearchResultSchema["_output"];
