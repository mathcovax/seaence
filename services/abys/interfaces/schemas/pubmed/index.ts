import { baseInputSchema } from "../input";
import { articleTypeEnumSchema } from "./articleType";
import {
	abstractSchema,
	associatedDataSchema,
	chemicalSchema,
	citedBySchema,
	commentSchema,
	expectSchema,
	figureSchema,
	linkOutSchema,
	meshTermSchema,
	referenceSchema,
	relatedInformationSchema,
	similarArticleSchema,
	substanceSchema,
} from "./generic";

const pubmedBaseArticleSchema = baseInputSchema.extend({
	source: zod.literal("Pubmed"),
	pubmedId: zod.string(),
	keywords: zod.string().array(),
	figures: figureSchema.array().nullable(),
	comments: commentSchema.array().nullable(),
	similarArticles: similarArticleSchema.array().nullable(),
	citedBys: citedBySchema.array().nullable(),
	references: referenceSchema.array().nullable(),
	meshTerms: meshTermSchema.array().nullable(),
	substances: substanceSchema.array().nullable(),
	associatedDatas: associatedDataSchema.array().nullable(),
	relatedInformations: relatedInformationSchema.array().nullable(),
	linkOuts: linkOutSchema.array().nullable(),
	chemicals: chemicalSchema.array().nullable(),
	articleTypes: articleTypeEnumSchema.array(),
});

const pubmedArticleTypeWithExpectSchema = pubmedBaseArticleSchema.extend({
	type: zod.literal("expect"),
	expect: expectSchema,
});

const pubmedArticleTypeWithAbstractSchema = pubmedBaseArticleSchema.extend({
	type: zod.literal("abstract"),
	abstract: abstractSchema.nullable(),
});

const pubmedArticleSchema = zod.union([
	pubmedArticleTypeWithAbstractSchema,
	pubmedArticleTypeWithExpectSchema,
]);

export {
	articleTypeEnumSchema,
	pubmedArticleSchema,
};
