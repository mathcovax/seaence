import { EntityHandler, intObjecter } from "@vendors/clean";
import { bakedDocumentIdObjecter } from "../common/bakedDocument";

export class BakedDocumentTranslationReportingAggregateEntity extends EntityHandler.create({
	bakedDocumentId: bakedDocumentIdObjecter,
	reportingQuantity: intObjecter,
}) {}
