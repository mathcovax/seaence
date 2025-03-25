import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const clinicalTrialArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("clinicalTrial"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
