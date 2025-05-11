import { type NotificationId } from "@business/domains/entities/notification/base";
import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { createRepositoryHandler, type RepositoryBase, type RepositoryError } from "@vendors/clean";

type Notification =
	| RegisterNotificationEntity;

export interface NotificationRepository extends RepositoryBase<Notification> {
	generateNotificationId(): NotificationId;
	sendNotification(notification: Notification): Promise<RepositoryError | undefined>;
}

export const notificationRepository = createRepositoryHandler<NotificationRepository>();
