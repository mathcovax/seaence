import { articleTypeSchema } from "./common";

export const filtersValuesSchema = zod.object({
	articleType: articleTypeSchema.array().optional(),
});
