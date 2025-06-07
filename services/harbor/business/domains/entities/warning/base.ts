import { EntityHandler, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../user";
import { baseWarningRules } from "@vendors/entity-rules";

export const baseUserWarningIdObjecter = zod
	.string()
	.createValueObjecter("baseUserWarningId");

export const baseUserWarningMakeUserBanObjecter = zod
	.boolean()
	.createValueObjecter("baseUserWarningMakeUserBan");

export const baseUserWarningReasonObjecter = zod
	.string()
	.min(baseWarningRules.reason.min)
	.max(baseWarningRules.reason.max)
	.createValueObjecter("baseUserWarningReason");

export type BaseUserWarningId = GetValueObject<typeof baseUserWarningIdObjecter>;
export type BaseUserWarningMakeUserBan = GetValueObject<typeof baseUserWarningMakeUserBanObjecter>;
export type BaseUserWarningReason = GetValueObject<typeof baseUserWarningReasonObjecter>;

export class BaseUserWarningEntity extends EntityHandler.create({
	id: baseUserWarningIdObjecter,
	makeUserBan: baseUserWarningMakeUserBanObjecter,
	reason: baseUserWarningReasonObjecter,
	userId: userIdObjecter,
}) {}
