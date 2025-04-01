import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { dateObjecter, urlObjecter } from "@business/domains/types/common";
import { authorObjecter, bookshelfIdentifierObjecter, digitalObjectIdentifierObjecter, documentIdObjecter, grantObjecter, titleObjecter } from "@business/domains/types/raw/document";

export class RawBaseDocumentEntity extends EntityHandler.create({
	id: documentIdObjecter,
	title: titleObjecter,
	publicationDate: dateObjecter,
	sourceUrl: urlObjecter,
	authors: authorObjecter.array().nullable(),
	grants: grantObjecter.array().nullable(),
	digitalObjectIdentifier: digitalObjectIdentifierObjecter.nullable(),
	bookshelfIdentifier: bookshelfIdentifierObjecter.nullable(),
}) {
	public static create(params: GetEntityProperties<typeof RawBaseDocumentEntity>) {
		return new RawBaseDocumentEntity(params);
	}
}
