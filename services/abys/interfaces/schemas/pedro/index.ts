import { baseInputSchema } from "../input";

const methodEnumSchema = zod.enum([
	"clinicalTrial",
	"systematicReview",
	"practiceGuideline",
]);

const structureContentSchema = zod.object({
	label: zod.string(),
	text: zod.string(),
});

const contentSchema = zod.object({
	full: zod.string(),
	structure: structureContentSchema.array().nullable(),
});

const pedroBaseArticleSchema = baseInputSchema.extend({
	source: zod.literal("Pedro"),
	method: methodEnumSchema,
	content: contentSchema.nullable(),
	links: zod.string().url().array(),
});

export const pedroArticleSchema = pedroBaseArticleSchema.extend({});
