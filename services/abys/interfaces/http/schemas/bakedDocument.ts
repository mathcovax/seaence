import { articleTypeObjecter } from "@business/domains/common/articleType";
import { bakedDocumentAbstractPartObjecter, bakedDocumentKeywordObjecter, bakedDocumentLanguageObjecter, bakedDocumentRessourceObjecter } from "@business/domains/entities/bakedDocument";

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
});
