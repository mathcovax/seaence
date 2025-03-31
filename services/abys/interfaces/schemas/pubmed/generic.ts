import { authorSchema } from "../input";

const referenceSchema = zod.object({
	citation: zod.string(),
	authors: authorSchema.array(),
	sourceUrl: zod.string().url(),
});

const structureAbstractSchema = zod.object({
	label: zod.string(),
	text: zod.string(),
});

const abstractSchema = zod.object({
	full: zod.string(),
	structure: structureAbstractSchema.array().nullable(),
});

const expectSchema = zod.string();

const issnSchema = zod.string().regex(/^\d{4}-\d{4}/);

const journalSchema = zod.object({
	title: zod.string(),
	issn: issnSchema,
	volume: zod.number(),
	issue: zod.number(),
});

const meshTermSchema = zod.object({
	term: zod.string(),
	urls: zod.string().url().array(),
});

const chemicalSchema = zod.object({
	name: zod.string(),
	registryNumber: zod.string(),
});

const citedBySchema = zod.object({
	title: zod.string(),
	authors: authorSchema.array(),
	journal: journalSchema,
});

const similarArticleSchema = zod.object({
	title: zod.string(),
	authors: authorSchema.array(),
	journal: journalSchema,
});

const commentSchema = zod.object({
	text: zod.string(),
	source: zod.string().nullable(),
});

const figureSchema = zod.object({
	name: zod.string(),
	url: zod.string(),
});

const associatedDataSchema = zod.object({
	name: zod.string(),
	urls: zod.string().url().array(),
});

const relatedInformationSchema = zod.object({
	type: zod.enum([
		"book",
		"article",
	]),
	name: zod.string(),
	url: zod.string().url(),
});

const linkOutSchema = zod.object({
	name: zod.string(),
	url: zod.string().url(),
});

const substanceSchema = zod.object({
	name: zod.string(),
	urls: zod.string().url().array(),
});

export {
	referenceSchema,
	structureAbstractSchema,
	issnSchema,
	journalSchema,
	meshTermSchema,
	chemicalSchema,
	citedBySchema,
	similarArticleSchema,
	commentSchema,
	figureSchema,
	associatedDataSchema,
	relatedInformationSchema,
	linkOutSchema,
	substanceSchema,
	abstractSchema,
	expectSchema,
};
