import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { userIdObjecter } from "../user";

export class BaseNotificationSettingsEntity extends EntityHandler.create({
	userId: userIdObjecter,
}) {
	public static create(params: GetEntityProperties<typeof BaseNotificationSettingsEntity>) {
		return new BaseNotificationSettingsEntity(params);
	}
}
