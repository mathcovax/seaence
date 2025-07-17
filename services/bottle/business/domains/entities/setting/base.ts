import { EntityHandler, type GetValueObject, zod } from "@vendors/clean";
import { userObjecter } from "@business/domains/common/user";

export const notificationSettingIdObjecter = zod.string().createValueObjecter("notificationSettingId");
export type NotificationSettingId = GetValueObject<typeof notificationSettingIdObjecter>;

export class BaseNotificationSettingEntity extends EntityHandler.create({
	id: notificationSettingIdObjecter,
	user: userObjecter,
}) {}
