import { registerNotificationTypeObjecter } from "@business/domains/entities/notification/register";
import { baseNotificatinSchema } from "./base";
export namespace RegisterNotificationSchema {
	export const index = baseNotificatinSchema.extend({
		type: registerNotificationTypeObjecter.zodSchema,
	});
}
