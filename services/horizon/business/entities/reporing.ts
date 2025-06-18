import { zod } from "@vendors/clean";
import { reportingRules } from "@vendors/entity-rules";

export namespace Reporting {
	export const details = zod
		.string()
		.min(reportingRules.details.minLength)
		.max(reportingRules.details.maxLength);
}
