import { EntityHandler } from "@vendors/clean";
import { userObjecter } from "@business/domains/common/user";

export class BaseNotificationSettingEntity extends EntityHandler.create({
	user: userObjecter,
}) {}
