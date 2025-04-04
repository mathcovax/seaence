import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
const {
	resourceUrl,
	title,
	authors,
	grants,
	keywords,
	articleTypes,
	articleIds,
	electronicPublicationDate,
	abstract,
	detailedAbstract,
	meshTerms,
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
	electronicPublicationDate: electronicPublicationDate.toZodSchema(),
	abstract: abstract.toZodSchema(),
	detailedAbstract: detailedAbstract.toZodSchema(),
	meshTerms: meshTerms.toZodSchema(),
});
