import { facetObjecter } from "@business/entities/facets";

export const facetSchema = facetObjecter
	.zodSchema
	.array();

export const endpointFacetsSchema = zod.object({
	total: zod.number(),
	facets: facetSchema.array(),
});

export type EndpointFacetsSchema = typeof endpointFacetsSchema["_output"];
