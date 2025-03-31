import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { RawBaseDocumentEntity } from "./base";
import { keywordObjecter } from "@business/domains/types/raw/document";
import { abstractObjecter, articleTypeObjecter, associatedDataObjecter, chemicalObjecter, citedByObjecter, commentObjecter, expectObjecter, figureObjecter, linkOutObjecter, meshTermObjecter, pubmedIdObjecter, referenceObjecter, relatedInformationObjecter, similarArticleObjecter } from "@business/domains/types/raw/pubmed";

export class PubmedRawDocumentEntity extends EntityHandler.create(
	{
		pubmedId: pubmedIdObjecter,
		keywords: keywordObjecter.array(),
		figures: figureObjecter.array().nullable(),
		comments: commentObjecter.array().nullable(),
		similarArticles: similarArticleObjecter.array().nullable(),
		citedBys: citedByObjecter.array().nullable(),
		references: referenceObjecter.array().nullable(),
		meshTerms: meshTermObjecter.array().nullable(),
		associatedDatas: associatedDataObjecter.array().nullable(),
		relatedInformations: relatedInformationObjecter.array().nullable(),
		linkOuts: linkOutObjecter.array().nullable(),
		chemicals: chemicalObjecter.array().nullable(),
		articleTypes: articleTypeObjecter.array(),
		expect: expectObjecter.nullable(),
		abstract: abstractObjecter.nullable(),
	},
	RawBaseDocumentEntity,
) {
	public static create(params: GetEntityProperties<typeof PubmedRawDocumentEntity>) {
		return new PubmedRawDocumentEntity(params);
	}
}
