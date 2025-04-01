import { urlObjecter } from "@business/domains/types/common";
import { authorObjecter, bookshelfIdentifierObjecter, digitalObjectIdentifierObjecter, documentIdObjecter, grantObjecter, titleObjecter } from "@business/domains/types/raw/document";

export const baseInputSchema = zod.object({
	id: documentIdObjecter.toZodSchema(),
	title: titleObjecter.toZodSchema(),
	authors: authorObjecter.toZodSchema().array().nullable(),
	publicationDate: zod.coerce.date(),
	sourceUrl: urlObjecter.toZodSchema(),
	grants: grantObjecter.toZodSchema().array().nullable(),
	digitalObjectIdentifier: digitalObjectIdentifierObjecter.toZodSchema().nullable(),
	bookshelfIdentifier: bookshelfIdentifierObjecter.toZodSchema().nullable(),
});
