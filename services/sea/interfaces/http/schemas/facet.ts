import { type ZodSpace } from "@duplojs/core";
import { articleTypeSchema } from "./common";

function createFacetSchema<
	GenericZodSchema extends ZodSpace.ZodType,
>(zodSchema: GenericZodSchema) {
	return zod.object({
		value: zodSchema,
		quantity: zod.number(),
	}).array();
}

export const facetWrapperSchema = zod.object({
	articleType: createFacetSchema(articleTypeSchema),
	year: createFacetSchema(zod.number()),
});

export type FacetWrapperSchema = typeof facetWrapperSchema["_output"];
