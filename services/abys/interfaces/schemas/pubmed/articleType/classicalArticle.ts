import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const classicalArticleArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("classicalArticle"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
