import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const bibliographyArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("bibliography"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
