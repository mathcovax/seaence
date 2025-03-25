import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const autobiographyArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("autobiography"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
