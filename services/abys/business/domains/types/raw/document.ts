import { type GetValueObject, zod } from "@vendors/clean";

const titleObjecter = zod.string().createValueObjecter("title");
type Title = GetValueObject<typeof titleObjecter>;

const authorObjecter = zod
	.object({
		name: zod.string(),
		affiliation: zod.string().array().nullable(),
	})
	.createValueObjecter("author");
type Author = GetValueObject<typeof authorObjecter>;

const grantObjecter = zod
	.object({
		acronym: zod.string().nullable(),
		agency: zod.string(),
	})
	.createValueObjecter("grants");
type Grant = GetValueObject<typeof grantObjecter>;

const keywordObjecter = zod.string().createValueObjecter("keyword");
type Keyword = GetValueObject<typeof keywordObjecter>;

const documentIdObjecter = zod.string().uuid().createValueObjecter(
	"documentId",
);
type DocumentId = GetValueObject<typeof documentIdObjecter>;

const digitalObjectIdentifierObjecter = zod.string().createValueObjecter("digitalObjectIdentifier");
type DigitalObjectIdentifier = GetValueObject<typeof digitalObjectIdentifierObjecter>;

const bookshelfIdentifierObjecter = zod.string().createValueObjecter("bookshelfIdentifier");
type BookshelfIdentifier = GetValueObject<typeof bookshelfIdentifierObjecter>;

export {
	titleObjecter,
	Title,
	authorObjecter,
	Author,
	grantObjecter,
	Grant,
	keywordObjecter,
	Keyword,
	documentIdObjecter,
	DocumentId,
	digitalObjectIdentifierObjecter,
	DigitalObjectIdentifier,
	bookshelfIdentifierObjecter,
	BookshelfIdentifier,
};
