import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";

const {
	resourceUrl,
	title,
	authors,
	grants,
	keywords,
	articleTypes,
	articleIds,
	abstract,
	abstractDetails,
	webPublishDate,
	journalPublishDate,
	uniqueArticleField,
} = PubmedRawDocumentEntity.propertiesDefinition;

export const entryPointCreatePubmedRawDocument = zod.object({
	provider: zod.literal("pubmed"),
	resourceUrl: resourceUrl.toZodSchema(),
	title: title.toZodSchema(),
	authors: authors.toZodSchema(),
	grants: grants.toZodSchema(),
	keywords: keywords.toZodSchema(),
	articleTypes: articleTypes.toZodSchema(),
	articleIds: articleIds.toZodSchema(),
	abstract: abstract.toZodSchema(),
	abstractDetails: abstractDetails.toZodSchema(),
	webPublishDate: webPublishDate.toZodSchema(),
	journalPublishDate: journalPublishDate.toZodSchema(),
	uniqueArticleField: uniqueArticleField.toZodSchema(),
});
