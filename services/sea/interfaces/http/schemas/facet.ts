import { type ZodSpace } from "@duplojs/core";
import { articleTypeSchema } from "./common";
import { genderEnum } from "@interfaces/search/facet/gender";
import { speciesEnum } from "@interfaces/search/facet/species";

function createFacetValueSchema<
	GenericZodSchema extends ZodSpace.ZodType,
>(zodSchema: GenericZodSchema) {
	return zod.object({
		value: zodSchema,
		quantity: zod.number(),
	});
}

function createFacetSchema<
	GenericName extends string,
	GenericZodSchema extends ZodSpace.ZodType,
>(
	name: GenericName,
	zodSchema: GenericZodSchema,
) {
	return zod.object({
		name: zod.literal(name),
		values: zodSchema.array(),
	});
}

export const genderSchema = zod.enum(genderEnum.toTuple());

export const speciesSchema = zod.enum(speciesEnum.toTuple());

export const facetSchema = zod
	.union([
		createFacetSchema(
			"articleType",
			createFacetValueSchema(articleTypeSchema),
		),
		createFacetSchema(
			"year",
			createFacetValueSchema(zod.number()),
		),
		createFacetSchema(
			"gender",
			createFacetValueSchema(genderSchema),
		),
		createFacetSchema(
			"species",
			createFacetValueSchema(speciesSchema),
		),
	]);

export const endpointFacetsSchema = zod.object({
	total: zod.number(),
	facets: facetSchema.array(),
});

export type EndpointFacetsSchema = typeof endpointFacetsSchema["_output"];
