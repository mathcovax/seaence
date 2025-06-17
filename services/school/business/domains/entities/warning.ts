import { type GetValueObject, zod } from "@vendors/clean";
import { baseWarningRules } from "@vendors/entity-rules";

export const warningReasonObjecter = zod
	.string()
	.min(baseWarningRules.reason.min)
	.max(baseWarningRules.reason.max)
	.createValueObjecter("warningReason");
export type WarningReason = GetValueObject<typeof warningReasonObjecter>;

export const warningMakeUserBanObjecter = zod
	.boolean()
	.createValueObjecter("warningMakeUserBan");
export type WarningMakeUserBan = GetValueObject<typeof warningMakeUserBanObjecter>;
