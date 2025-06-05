import { bakedDocumentIdObjecter } from "@business/domains/common/bakedDocument";
import { userIdObjecter } from "@business/domains/common/user";
import { reportingDetailsObjecter, reportingIdObjecter } from "@business/domains/entities/reporting";
import { intObjecter } from "@vendors/clean";

export const bakedDocumentTranslationReportingEntitySchema = zod.object({
	bakedDocumentId: bakedDocumentIdObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	id: reportingIdObjecter.zodSchema,
	details: reportingDetailsObjecter.zodSchema,
});

export const endPointFindManyBakedDocumentTranslationReportingEntitySchema
	= bakedDocumentTranslationReportingEntitySchema.array();

export const endpointFindManyBakedDocumentTranslationReportingDetailsSchema
	= zod.object({
		countTotal: intObjecter.zodSchema,
	});
