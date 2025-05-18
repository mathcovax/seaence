import { createEnum, zod, flexibleDateObjecter } from "@vendors/clean";
import { articleTypeObjecter } from "./common/articleType";
import { providerEnum } from "./common/provider";

export const bakedDocumentLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

export const bakedDocumentLanguageObjecter = zod
	.enum(bakedDocumentLanguageEnum.toTuple())
	.createValueObjecter("backedDocumentLanguage");

export const bakedDocumentAuthorObjecter = zod
	.object({
		name: zod.string(),
		affiliations: zod.string().array().nullable(),
	})
	.createValueObjecter("bakedDocumentAuthor");

export const bakedDocumentAbstractPartObjecter = zod
	.object({
		name: zod.string(),
		label: zod.string(),
		content: zod.string(),
	})
	.createValueObjecter("bakedDocumentAbstractPart");

export const resourceProviderEnum = createEnum([
	"DOIFoundation",
	...providerEnum.toTuple(),
]);

export const bakedDocumentRessourceObjecter = zod
	.object({
		resourceProvider: zod.enum(resourceProviderEnum.toTuple()),
		url: zod.string(),
	})
	.createValueObjecter("bakedDocumentRessource");

export const bakedDocumentKeywordObjecter = zod
	.object({
		value: zod.string(),
	})
	.createValueObjecter("bakedDocumentKeyword");

export const bakedDocumentObjecter = zod
	.object({
		id: zod.string(),
		nodeSameRawDocumentId: zod.string(),
		articleTypes: articleTypeObjecter.zodSchema.array(),
		title: zod.string(),
		language: bakedDocumentLanguageObjecter.zodSchema,
		abstract: zod.string().nullable(),
		authors: bakedDocumentAuthorObjecter.zodSchema.array(),
		abstractDetails: bakedDocumentAbstractPartObjecter.zodSchema.array().nullable(),
		resources: bakedDocumentRessourceObjecter.zodSchema.array(),
		keywords: bakedDocumentKeywordObjecter.zodSchema.array(),
		webPublishDate: flexibleDateObjecter.zodSchema.nullable(),
		journalPublishDate: flexibleDateObjecter.zodSchema.nullable(),
	})
	.createValueObjecter("backedDocument");
