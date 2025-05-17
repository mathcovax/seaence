import { facetObjecter } from "@business/entities/facets";

export const facetSchema = facetObjecter.zodSchema;

export const endpointSearchDetailsSchema = zod.object({
	total: zod.number(),
	facets: facetSchema.array(),
	quantityPerPage: zod.number(),
});
