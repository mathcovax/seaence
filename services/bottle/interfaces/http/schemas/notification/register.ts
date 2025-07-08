import { registerNotificationTypeObjecter } from "@business/domains/entities/notification/register";
import { baseNotificatinSchema } from "./base";

export const registerNotificationSchema = baseNotificatinSchema.extend({
	type: registerNotificationTypeObjecter.zodSchema,
});
