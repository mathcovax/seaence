import { articleTypeObjecter } from "@business/domains/common/articleType";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import { rawAbstractObjecter, rawAbstractPartObjecter, rawAuthorObjecter, rawGrantObjecter, rawResourceUrlObjecter, rawTitleObjecter, rawKeywordObjecter } from "@business/domains/common/rawDocument";
import { EntityHandler, type GetValueObject, type GetEntityProperties, zod, dateYYYYMMDDObjecter, flexibleDateObjecter } from "@vendors/clean";

export const pubmedRawDocumentArticleIdObjecter = zod
	.object({
		name: zod.string(),
		value: zod.string(),
	})
	.createValueObjecter("articleId");

export type PubmedRawDocumentArticleId = GetValueObject<typeof pubmedRawDocumentArticleIdObjecter>;

export class PubmedRawDocumentEntity extends EntityHandler.create({
	uniqueArticleField: uniqueFieldObjecter,
	resourceUrl: rawResourceUrlObjecter,
	title: rawTitleObjecter,
	authors: rawAuthorObjecter.array().nullable(),
	grants: rawGrantObjecter.array().nullable(),
	keywords: rawKeywordObjecter.array(),
	articleTypes: articleTypeObjecter.array(),
	articleIds: pubmedRawDocumentArticleIdObjecter.array(),
	abstract: rawAbstractObjecter.nullable(),
	detailedAbstract: rawAbstractPartObjecter.array().nullable(),
	webPublishDate: dateYYYYMMDDObjecter.nullable(),
	journalPublishDate: flexibleDateObjecter.nullable(),
}) {
	public static create(params: GetEntityProperties<typeof PubmedRawDocumentEntity>) {
		return new PubmedRawDocumentEntity(params);
	}
}
