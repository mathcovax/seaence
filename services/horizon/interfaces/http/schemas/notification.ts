import { notificationObjecter } from "@business/entities/notification";

export const endpointNotificationListSchema = notificationObjecter.zodSchema.array();

export const endpointNotificationListPageSchema = zod.object({
	totalNoticationCount: zod.number(),
	quantityNotificationPerPage: zod.number(),
});
