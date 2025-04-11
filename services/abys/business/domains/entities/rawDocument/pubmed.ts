import { articleTypeObjecter } from "@business/domains/common/articleType";
import { rawAbstractObjecter, rawAbstractPartObjecter, rawAuthorObjecter, rawGrantObjecter, rawResourceUrlObjecter, rawTitleObjecter } from "@business/domains/common/rawDocument";
import { EntityHandler, type GetValueObject, type GetEntityProperties, zod, dateYYYYMMDDObjecter } from "@vendors/clean";

export const pubmedRawDocumentArticleIdObjecter = zod
	.object({
		type: zod.string(),
		value: zod.string(),
	})
	.createValueObjecter("articleId");

export type PubmedRawDocumentArticleId = GetValueObject<typeof pubmedRawDocumentArticleIdObjecter>;

export const pubmedRawDocumentElectronicPublicationDateObjecter = dateYYYYMMDDObjecter
	.declination("pubmedRawDocumentElectronicPublicationDate");

export type PubmedRawDocumentElectronicPublicationDate =
	GetValueObject<typeof pubmedRawDocumentElectronicPublicationDateObjecter>;

export const pubmedRawDocumentMeshTermObjecter = zod
	.object({
		ui: zod.string(),
		majorTopic: zod.boolean(),
		value: zod.string(),
	})
	.createValueObjecter("pubmedRawDocumentMeshTerm");

export type PubmedRawDocumentMeshTerm = GetValueObject<typeof pubmedRawDocumentMeshTermObjecter>;

export const pubmedRawDocumentKeywordObjecter = zod
	.object({
		majorTopic: zod.boolean(),
		value: zod.string(),
	})
	.createValueObjecter("pubmedRawDocumentKeyword");

export type PubmedRawDocumentKeyword = GetValueObject<typeof pubmedRawDocumentKeywordObjecter>;

export class PubmedRawDocumentEntity extends EntityHandler.create({
	resourceUrl: rawResourceUrlObjecter,
	title: rawTitleObjecter,
	authors: rawAuthorObjecter.array(),
	grants: rawGrantObjecter.array(),
	keywords: pubmedRawDocumentKeywordObjecter.array(),
	articleTypes: articleTypeObjecter.array(),
	articleIds: pubmedRawDocumentArticleIdObjecter.array(),
	electronicPublicationDate: pubmedRawDocumentElectronicPublicationDateObjecter,
	abstract: rawAbstractObjecter.nullable(),
	detailedAbstract: rawAbstractPartObjecter.array().nullable(),
	meshTerms: pubmedRawDocumentMeshTermObjecter.array(),
}) {
	public static create(params: GetEntityProperties<typeof PubmedRawDocumentEntity>) {
		return new PubmedRawDocumentEntity(params);
	}
}
