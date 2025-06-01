import { type NotificationId } from "@business/domains/entities/notification/base";
import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

type Notification =
	| RegisterNotificationEntity
	| ReplyToPostNotificationEntity;

export interface NotificationRepository extends RepositoryBase<Notification> {
	generateNotificationId(): NotificationId;
	sendNotification(notification: Notification): Promise<void>;
}

export const notificationRepository = createRepositoryHandler<NotificationRepository>();
