import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const clinicalStudyArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("clinicalStudy"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
