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
	source: zod.literal("PubMed"),
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
	digitalObjectIdentifier: zod.string().nullable(),
	articleTypes: articleTypeEnumSchema.array(),
	bookshelfIdentifier: zod.string().nullable(),
});

const pubmedArticleTypeWithExpectSchema = pubmedBaseArticleSchema.extend({
	expect: expectSchema,
});

const pubmedArticleTypeWithAbstractSchema = pubmedBaseArticleSchema.extend({
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
