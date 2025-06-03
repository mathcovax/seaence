import { bakedDocumentIdObjecter } from "@business/domains/common/bakedDocument";
import { intObjecter } from "@vendors/clean";

export const bakedDocumentTranslationReportingAggregateSchema = zod.object({
	bakedDocumentId: bakedDocumentIdObjecter.zodSchema,
	reportingQuantity: intObjecter.zodSchema,
});

export const endpointFindManyBakedDocumentTranslationReportingAggregateSchema
	= bakedDocumentTranslationReportingAggregateSchema.array();
