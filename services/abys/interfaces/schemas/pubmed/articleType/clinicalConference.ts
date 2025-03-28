import { pubmedBaseArticleSchema } from "..";
import { abstractSchema } from "../generic";

export const clinicalConferenceArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("clinicalConference"),
	digitalObjectIdentifier: zod.string().nullable(),
	abstract: abstractSchema.nullable(),
});
