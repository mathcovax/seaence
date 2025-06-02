import { type NotificationId } from "@business/domains/entities/notification/base";
import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type Notification =
	| RegisterNotificationEntity
	| ReplyToPostNotificationEntity;

export interface NotificationRepository extends RepositoryBase<Notification> {
	generateNotificationId(): NotificationId;
	sendNotification(notification: Notification, user: UserEntity): Promise<void>;
}

export const notificationRepository = createRepositoryHandler<NotificationRepository>();
