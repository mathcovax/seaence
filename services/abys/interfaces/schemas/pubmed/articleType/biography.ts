import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const biographyArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("biography"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
