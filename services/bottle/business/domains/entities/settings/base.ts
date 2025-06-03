import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { userObjecter } from "@business/domains/common/user";

export class BaseNotificationSettingsEntity extends EntityHandler.create({
	user: userObjecter,
}) {
	public static create(params: GetEntityProperties<typeof BaseNotificationSettingsEntity>) {
		return new BaseNotificationSettingsEntity(params);
	}
}
