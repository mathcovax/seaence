import { abstractObjecter, articleTypeObjecter, associatedDataObjecter, chemicalObjecter, citedByObjecter, commentObjecter, expectObjecter, figureObjecter, linkOutObjecter, meshTermObjecter, pubmedIdObjecter, referenceObjecter, relatedInformationObjecter, similarArticleObjecter, substanceObjecter } from "@business/domains/types/raw/pubmed";
import { baseInputSchema } from "../base";
import { keywordObjecter } from "@business/domains/types/raw/document";
import { zod } from "@vendors/clean";

const pubmedBaseArticleSchema = baseInputSchema.extend({
	source: zod.literal("Pubmed"),
	pubmedId: pubmedIdObjecter.toZodSchema(),
	keywords: keywordObjecter.toZodSchema().array(),
	figures: figureObjecter.toZodSchema().array().nullable(),
	comments: commentObjecter.toZodSchema().array().nullable(),
	similarArticles: similarArticleObjecter.toZodSchema().array().nullable(),
	citedBys: citedByObjecter.toZodSchema().array().nullable(),
	references: referenceObjecter.toZodSchema().array().nullable(),
	meshTerms: meshTermObjecter.toZodSchema().array().nullable(),
	substances: substanceObjecter.toZodSchema().array().nullable(),
	associatedDatas: associatedDataObjecter.toZodSchema().array().nullable(),
	relatedInformations: relatedInformationObjecter.toZodSchema().array().nullable(),
	linkOuts: linkOutObjecter.toZodSchema().array().nullable(),
	chemicals: chemicalObjecter.toZodSchema().array().nullable(),
	articleTypes: articleTypeObjecter.toZodSchema().array(),
});

const pubmedArticleTypeWithExpectSchema = pubmedBaseArticleSchema.extend({
	type: zod.literal("expect"),
	expect: expectObjecter.toZodSchema().nullable(),
});

const pubmedArticleTypeWithAbstractSchema = pubmedBaseArticleSchema.extend({
	type: zod.literal("abstract"),
	abstract: abstractObjecter.toZodSchema().nullable(),
});

const pubmedArticleSchema = zod.union([
	pubmedArticleTypeWithAbstractSchema,
	pubmedArticleTypeWithExpectSchema,
]);

export {
	pubmedArticleSchema,
};
