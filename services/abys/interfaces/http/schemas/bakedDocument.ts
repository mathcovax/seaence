import { flexibleDateObjecter } from "@vendors/clean";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { bakedDocumentAbstractPartObjecter, bakedDocumentKeywordObjecter, bakedDocumentRessourceObjecter, bakedDocumentAuthorObjecter, bakedDocumentTitleObjecter } from "@business/domains/entities/bakedDocument";
import { bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/nodeSameRawDocument";
import { cookingModeObjecter } from "@business/domains/common/cookingMode";

export const endpointBakedDocumentSchema = zod.object({
	id: zod.string(),
	cookingMode: cookingModeObjecter.zodSchema,
	nodeSameRawDocumentId: zod.string(),
	title: zod.string(),
	language: bakedDocumentLanguageObjecter.zodSchema,
	abstract: zod.string().nullable(),
	abstractDetails: bakedDocumentAbstractPartObjecter
		.zodSchema
		.array()
		.nullable(),
	resources: bakedDocumentRessourceObjecter.zodSchema.array(),
	keywords: bakedDocumentKeywordObjecter.zodSchema.array(),
	articleTypes: articleTypeObjecter.zodSchema.array(),
	authors: bakedDocumentAuthorObjecter.zodSchema.array(),
	webPublishDate: flexibleDateObjecter.zodSchema.nullable(),
	journalPublishDate: flexibleDateObjecter.zodSchema.nullable(),
});

export const endpointFindManyBakedDocumentNotfoundSchema = zod.object({
	notfoundBakedDocumentIds: zod.string().array(),
});

export const endpointFindManyBakedDocumentTitleSchema = zod.record(
	nodeSameRawDocumentIdObjecter.zodSchema,
	bakedDocumentTitleObjecter.zodSchema.optional(),
);
