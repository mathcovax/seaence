import { type GetValueObject, zod } from "@vendors/clean";

export const warningReasonObjecter = zod
	.string()
	.createValueObjecter("warningReason");
export type WarningReason = GetValueObject<typeof warningReasonObjecter>;

export const warningMakeUserBanObjecter = zod
	.boolean()
	.createValueObjecter("warningMakeUserBan");
export type WarningMakeUserBan = GetValueObject<typeof warningMakeUserBanObjecter>;
