import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const caseReportsArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("caseReports"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
