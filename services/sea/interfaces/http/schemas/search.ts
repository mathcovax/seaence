import { articleTypeSchema } from "./common";
import { facetWrapperSchema } from "./facet";

export const simpleSearchSchema = zod.object({
	score: zod.number(),
	abysBakedDocumentId: zod.string(),
	title: zod.string(),
	articleType: articleTypeSchema.array(),
	authorsNames: zod.string().array(),
	webPublishDate: zod.string().nullable(),
	journalPublishDate: zod.string().nullable(),
	summary: zod.string().nullable(),
	keywords: zod.string().array(),
});

export const endpointSimpleSearchSchema = zod.object({
	total: zod.number(),
	results: simpleSearchSchema.array(),
	facetWrapper: facetWrapperSchema,
});

export type EndpointSimpleSearchSchema = typeof endpointSimpleSearchSchema["_output"];
