import { EntityHandler, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../user";
import { baseWarningRules } from "@vendors/entity-rules";

export const userWarningIdObjecter = zod
	.string()
	.createValueObjecter("userWarningId");

export const userWarningMakeUserBanObjecter = zod
	.boolean()
	.createValueObjecter("userWarningMakeUserBan");

export const userWarningReasonObjecter = zod
	.string()
	.min(baseWarningRules.reason.min)
	.max(baseWarningRules.reason.max)
	.createValueObjecter("userWarningReason");

export type UserWarningId = GetValueObject<typeof userWarningIdObjecter>;
export type UserWarningMakeUserBan = GetValueObject<typeof userWarningMakeUserBanObjecter>;
export type UserWarningReason = GetValueObject<typeof userWarningReasonObjecter>;

export class UserWarningEntity extends EntityHandler.create({
	id: userWarningIdObjecter,
	makeUserBan: userWarningMakeUserBanObjecter,
	reason: userWarningReasonObjecter,
	userId: userIdObjecter,
}) {}
