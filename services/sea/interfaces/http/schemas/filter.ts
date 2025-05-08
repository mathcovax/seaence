import { articleTypeSchema } from "./common";
import { genderSchema, speciesSchema } from "./facet";

export const filtersValuesSchema = zod.object({
	articleType: articleTypeSchema.array().optional(),
	gender: genderSchema.array().optional(),
	species: speciesSchema.array().optional(),
	year: zod
		.object({
			min: zod.number(),
			max: zod.number(),
		})
		.optional(),
});
