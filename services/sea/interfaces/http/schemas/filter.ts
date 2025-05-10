import { articleTypeSchema } from "./common";
import { genderSchema, speciesSchema } from "./facet";

export const filtersValuesSchema = zod.object({
	articleType: articleTypeSchema.array().optional(),
	gender: genderSchema.array().optional(),
	species: speciesSchema.array().optional(),
	year: zod
		.object({
			from: zod.number(),
			to: zod.number(),
		})
		.optional(),
});
