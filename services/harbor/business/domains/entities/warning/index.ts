import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";

export const warningIdObjecter = zod
	.string()
	.createValueObjecter("warningId");

export const warningMakeUserBanObjecter = zod
	.boolean()
	.createValueObjecter("warningMakeUserBan");

export const warningReasonObjecter = zod
	.string()
	.createValueObjecter("warningReason");

export type WarningId = GetValueObject<typeof warningIdObjecter>;
export type WarningMakeUserBan = GetValueObject<typeof warningMakeUserBanObjecter>;
export type WarningReason = GetValueObject<typeof warningReasonObjecter>;

export class WarningEntity extends EntityHandler.create({
	id: warningIdObjecter,
	makeUserBan: warningMakeUserBanObjecter,
	reason: warningReasonObjecter,
}) {
	public static create(params: GetEntityProperties<typeof WarningEntity>) {
		return new WarningEntity(params);
	}
}
