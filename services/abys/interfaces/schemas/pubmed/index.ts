import { baseInputSchema } from "../input";
import {
	adaptiveClinicalTrialArticleTypeSchema,
	autobiographyArticleTypeSchema,
	addressArticleTypeSchema,
	bibliographyArticleTypeSchema,
	biographyArticleTypeSchema,
	booksAndDocumentsArticleTypeSchema,
	caseReportsArticleTypeSchema,
	classicalArticleArticleTypeSchema,
	clinicalConferenceArticleTypeSchema,
	clinicalStudyArticleTypeSchema,
	clinicalTrialArticleTypeSchema,
} from "./articleType";
import {
	associatedDataSchema,
	chemicalSchema,
	citedBySchema,
	commentSchema,
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
});

const pubmedArticleSchema = zod.union([
	adaptiveClinicalTrialArticleTypeSchema,
	autobiographyArticleTypeSchema,
	addressArticleTypeSchema,
	bibliographyArticleTypeSchema,
	biographyArticleTypeSchema,
	booksAndDocumentsArticleTypeSchema,
	caseReportsArticleTypeSchema,
	classicalArticleArticleTypeSchema,
	clinicalConferenceArticleTypeSchema,
	clinicalStudyArticleTypeSchema,
	clinicalTrialArticleTypeSchema,
]);

export {
	pubmedBaseArticleSchema,
	pubmedArticleSchema,
};
