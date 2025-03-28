import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { dateObjecter, urlObjecter } from "@business/domains/types/common";
import { authorObjecter, documentIdObjecter, grantObjecter } from "@business/domains/types/raw/document";

export class RawBaseDocumentEntity extends EntityHandler.create({
	id: documentIdObjecter,
	publicationDate: dateObjecter,
	sourceUrl: urlObjecter,
	authors: authorObjecter.array(),
	grants: grantObjecter.array().nullable(),
}) {
	public static create(params: GetEntityProperties<typeof RawBaseDocumentEntity>) {
		return new RawBaseDocumentEntity(params);
	}
}
