import { articleTypeObjecter } from "@business/domains/common/articleType";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import { rawAbstractObjecter, rawAbstractPartObjecter, rawAuthorObjecter, rawGrantObjecter, rawResourceUrlObjecter, rawTitleObjecter, rawKeywordObjecter } from "@business/domains/common/rawDocument";
import { EntityHandler, type GetValueObject, type GetEntityProperties, zod, dateYYYYMMDDObjecter } from "@vendors/clean";

export const pubmedRawDocumentArticleIdObjecter = zod
	.object({
		name: zod.string(),
		value: zod.string(),
	})
	.createValueObjecter("articleId");

export type PubmedRawDocumentArticleId = GetValueObject<typeof pubmedRawDocumentArticleIdObjecter>;

export const pubmedRawDocumentJournalPublishDateObjecter = zod
	.object({
		day: zod.number().nullable(),
		mounth: zod.number().nullable(),
		year: zod.number(),
	})
	.createValueObjecter("pubmedRawDocumentJournalPublishDate");

export type PubmedRawDocumentJournalPublishDate = GetValueObject<typeof pubmedRawDocumentJournalPublishDateObjecter>;

export class PubmedRawDocumentEntity extends EntityHandler.create({
	uniqueArticleField: uniqueFieldObjecter,
	resourceUrl: rawResourceUrlObjecter,
	title: rawTitleObjecter,
	authors: rawAuthorObjecter.array(),
	grants: rawGrantObjecter.array(),
	keywords: rawKeywordObjecter.array(),
	articleTypes: articleTypeObjecter.array(),
	articleIds: pubmedRawDocumentArticleIdObjecter.array(),
	abstract: rawAbstractObjecter.nullable(),
	detailedAbstract: rawAbstractPartObjecter.array().nullable(),
	webPublishDate: dateYYYYMMDDObjecter.nullable(),
	journalPublishDate: pubmedRawDocumentJournalPublishDateObjecter.nullable(),
}) {
	public static create(params: GetEntityProperties<typeof PubmedRawDocumentEntity>) {
		return new PubmedRawDocumentEntity(params);
	}
}
