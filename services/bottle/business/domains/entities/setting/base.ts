import { EntityHandler } from "@vendors/clean";
import { userObjecter } from "@business/domains/common/user";

export class BaseNotificationSettingsEntity extends EntityHandler.create({
	user: userObjecter,
}) {}
