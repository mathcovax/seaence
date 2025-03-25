import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const adaptiveClinicalTrialArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("adaptiveClinicalTrial"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
