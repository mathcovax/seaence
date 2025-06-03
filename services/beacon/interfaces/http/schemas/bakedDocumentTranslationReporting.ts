import { bakedDocumentIdObjecter } from "@business/domains/common/bakedDocument";
import { userIdObjecter } from "@business/domains/common/user";
import { reportingDetailsObjecter, reportingIdObjecter } from "@business/domains/entities/reporting";

export const bakedDocumentTranslationReportingEntitySchema = zod.object({
	bakedDocumentId: bakedDocumentIdObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	id: reportingIdObjecter.zodSchema,
	details: reportingDetailsObjecter.zodSchema,
});

export const endPointFindManyBakedDocumentTranslationReportingEntitySchema
	= bakedDocumentTranslationReportingEntitySchema.array();
