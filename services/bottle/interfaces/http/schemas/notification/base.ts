import { userEmailObjecter, userIdObjecter, userLanguageObjecter, usernameObjecter } from "@business/domains/entities/user";
import { commonDateObjecter } from "@vendors/clean";
import { notificationIdObjecter, processedObjecter } from "@business/domains/entities/notification/base";

export const baseNotificatinSchema = zod.object({
	id: notificationIdObjecter.zodSchema,
	user: zod.object({
		id: userIdObjecter.zodSchema,
		username: usernameObjecter.zodSchema,
		email: userEmailObjecter.zodSchema,
		language: userLanguageObjecter.zodSchema,
	}),
	processed: processedObjecter.zodSchema,
	createdAt: commonDateObjecter.zodSchema,
	deleteAt: commonDateObjecter.zodSchema,
});

export const baseNotificationSettingSchema = zod.object({
	user: zod.object({
		id: userIdObjecter.zodSchema,
		username: usernameObjecter.zodSchema,
		email: userEmailObjecter.zodSchema,
		language: userLanguageObjecter.zodSchema,
	}),
});
