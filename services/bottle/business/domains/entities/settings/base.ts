import { userIdObjecter } from "@business/domains/common/user";
import { EntityHandler, type GetValueObject, zod, type GetEntityProperties } from "@vendors/clean";

export const activatedObjecter = zod.boolean().createValueObjecter("activated");
export type Activated = GetValueObject<typeof activatedObjecter>;

export class BaseNotificationSettingsEntity extends EntityHandler.create({
	userId: userIdObjecter,
	activated: activatedObjecter,
}) {
	public static create(params: GetEntityProperties<typeof BaseNotificationSettingsEntity>) {
		return new BaseNotificationSettingsEntity(params);
	}
}
