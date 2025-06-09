import { type GetValueObject, zod } from "@vendors/clean";

export const warningIdObjecter = zod
	.string()
	.createValueObjecter("warningId");

export type WarningId = GetValueObject<typeof warningIdObjecter>;

export const warningReasonObjecter = zod
	.string()
	.createValueObjecter("warningReason");

export type WarningReason = GetValueObject<typeof warningReasonObjecter>;
