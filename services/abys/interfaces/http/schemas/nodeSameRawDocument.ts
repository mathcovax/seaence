import { articleTypeObjecter } from "@business/domains/common/articleType";
import { bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { bakedDocumentAbstractPartObjecter, bakedDocumentAuthorObjecter, bakedDocumentKeywordObjecter, bakedDocumentRessourceObjecter } from "@business/domains/entities/bakedDocument";
import { flexibleDateObjecter } from "@vendors/clean";

export const endpointCookedNodeSameRawDocumentSchema = zod.object({
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
