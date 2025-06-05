import { EntityHandler, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../user";

export const baseUserWarningIdObjecter = zod
	.string()
	.createValueObjecter("baseUserWarningId");

export const baseUserWarningMakeUserBanObjecter = zod
	.boolean()
	.createValueObjecter("baseUserWarningMakeUserBan");

const reasonRule = {
	min: 5,
	max: 250,
};

export const baseUserWarningReasonObjecter = zod
	.string()
	.min(reasonRule.min)
	.max(reasonRule.max)
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
