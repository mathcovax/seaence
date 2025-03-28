import { pubmedBaseArticleSchema } from "..";
import { abstractSchema, expectSchema } from "../generic";

const baseBooksAndDocumentsArticleTypeSchema = pubmedBaseArticleSchema.extend({
	articleType: zod.literal("booksAndDocuments"),
	digitalObjectIdentifier: zod.string().nullable(),
	bookshelfIdentifier: zod.string().nullable(),
});

const booksAndDocumentsArticleTypeWithExpectSchema = baseBooksAndDocumentsArticleTypeSchema.extend({
	expect: expectSchema,
});

const booksAndDocumentsArticleTypeWithAbstractSchema = baseBooksAndDocumentsArticleTypeSchema.extend({
	abstract: abstractSchema.nullable(),
});

export const booksAndDocumentsArticleTypeSchema = zod.union([
	booksAndDocumentsArticleTypeWithExpectSchema,
	booksAndDocumentsArticleTypeWithAbstractSchema,
]);
