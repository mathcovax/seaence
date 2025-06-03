import { flexibleDateObjecter } from "@vendors/clean";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { bakedDocumentAbstractPartObjecter, bakedDocumentKeywordObjecter, bakedDocumentRessourceObjecter, bakedDocumentAuthorObjecter } from "@business/domains/entities/bakedDocument";
import { bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";

export const endpointBakedDocumentSchema = zod.object({
	id: zod.string(),
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
