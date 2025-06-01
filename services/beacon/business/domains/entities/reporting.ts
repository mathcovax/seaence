import { EntityHandler, type GetValueObject, zod } from "@vendors/clean";
import { reportingRules } from "@vendors/entity-rules";

export const reportingIdObjecter = zod
	.string()
	.createValueObjecter("reportingId");

export type ReportingId = GetValueObject<typeof reportingIdObjecter>;

export const reportingDetailsObjecter = zod
	.string()
	.min(reportingRules.details.minLength)
	.max(reportingRules.details.maxLength)
	.createValueObjecter("reportingDetails");

export type ReportingDetails = GetValueObject<typeof reportingDetailsObjecter>;

export class ReportingEntity extends EntityHandler.create({
	id: reportingIdObjecter,
	details: reportingDetailsObjecter,
}) {
	public updateDetails(details: ReportingDetails) {
		return this.update({
			details,
		});
	}
}
