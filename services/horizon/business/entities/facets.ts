import { createEnum, type GetValueObject, zod, type GetEnumValue } from "@vendors/clean";
import { articleTypeObjecter } from "./common/articleType";

export const facetTypeEnum = createEnum([
	"checkbox",
	"multiSelect",
	"range",
]);

export const genderFacetValueEnum = createEnum(["male", "female"]);

export type GenderFacetValue = GetEnumValue<typeof genderFacetValueEnum>;

export const genderFacetValueObjecter = zod
	.enum(genderFacetValueEnum.toTuple())
	.createValueObjecter("genderFacetValue");

export const genderFacetObjecter = zod
	.object({
		type: zod.literal(facetTypeEnum.checkbox),
		name: zod.literal("gender"),
		values: zod.object({
			value: genderFacetValueObjecter.zodSchema,
			quantity: zod.number(),
		}).array(),
	})
	.createValueObjecter("genderFacet");

export const speciesFacetValueEnum = createEnum(["human", "otherAnimal"]);

export type SpeciesFacetValue = GetEnumValue<typeof speciesFacetValueEnum>;

export const speciesFacetValueObjecter = zod
	.enum(speciesFacetValueEnum.toTuple())
	.createValueObjecter("speciesFacetValue");

export const speciesFacetObjecter = zod
	.object({
		type: zod.literal(facetTypeEnum.checkbox),
		name: zod.literal("species"),
		values: zod.object({
			value: speciesFacetValueObjecter.zodSchema,
			quantity: zod.number(),
		}).array(),
	})
	.createValueObjecter("speciesFacet");

export const articleTypeFacetObjecter = zod
	.object({
		type: zod.literal(facetTypeEnum.multiSelect),
		name: zod.literal("articleType"),
		values: zod.object({
			value: articleTypeObjecter.zodSchema,
			quantity: zod.number(),
		}).array(),
	})
	.createValueObjecter("articleTypeFacet");

export const yearFacetValueObjecter = zod
	.number()
	.createValueObjecter("yearFacetValue");

export const yearFacetObjecter = zod
	.object({
		type: zod.literal(facetTypeEnum.range),
		name: zod.literal("year"),
		values: zod.object({
			value: yearFacetValueObjecter.zodSchema,
			quantity: zod.number(),
		}).array(),
	})
	.createValueObjecter("yearFacet");

export const facetObjecter = zod
	.union([
		articleTypeFacetObjecter.zodSchema,
		genderFacetObjecter.zodSchema,
		speciesFacetObjecter.zodSchema,
		yearFacetObjecter.zodSchema,
	])
	.createValueObjecter("facet");

export type Facet = GetValueObject<typeof facetObjecter>["value"];

