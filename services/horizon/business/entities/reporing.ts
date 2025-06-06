import { zod } from "@vendors/clean";
import { reportingRules } from "@vendors/entity-rules";

export const reportingDetailsObjecter = zod
	.string()
	.min(reportingRules.details.minLength)
	.max(reportingRules.details.maxLength)
	.createValueObjecter("reportingDetails");
