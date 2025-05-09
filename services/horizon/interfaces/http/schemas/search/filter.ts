import { articleTypeFacetValueObjecter, genderFacetValueObjecter, speciesFacetValueObjecter, yearFacetValueObjecter } from "@business/entities/facets";

export const filtersValuesSchema = zod.object({
	articleType: articleTypeFacetValueObjecter.zodSchema.array().optional(),
	gender: genderFacetValueObjecter.zodSchema.array().optional(),
	species: speciesFacetValueObjecter.zodSchema.array().optional(),
	year: zod.object({
		from: yearFacetValueObjecter.zodSchema,
		to: yearFacetValueObjecter.zodSchema,
	}).optional(),
});
