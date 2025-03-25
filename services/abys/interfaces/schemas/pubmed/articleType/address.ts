import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const addressArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("address"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
