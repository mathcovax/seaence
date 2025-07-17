import { commonDateObjecter } from "@vendors/clean";
import { notificationIdObjecter, processedObjecter } from "@business/domains/entities/notification/base";
import { notificationSettingIdObjecter } from "@business/domains/entities/setting/base";

export const baseNotificatinSchema = zod.object({
	id: notificationIdObjecter.zodSchema,
	processed: processedObjecter.zodSchema,
	createdAt: commonDateObjecter.zodSchema,
	deleteAt: commonDateObjecter.zodSchema,
});

export const baseNotificationSettingSchema = zod.object({
	id: notificationSettingIdObjecter.zodSchema,
});
