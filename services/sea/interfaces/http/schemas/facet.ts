import { type ZodSpace } from "@duplojs/core";
import { articleTypeSchema } from "./common";
import { genderEnum } from "@interfaces/search/facet/gender";
import { speciesEnum } from "@interfaces/search/facet/species";

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
	gender: createFacetSchema(zod.enum(genderEnum.toTuple())),
	species: createFacetSchema(zod.enum(speciesEnum.toTuple())),
});

export type FacetWrapperSchema = typeof facetWrapperSchema["_output"];
