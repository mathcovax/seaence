import { type NotificationId } from "@business/domains/entities/notification/base";
import { type InscriptionNotificationEntity } from "@business/domains/entities/notification/email";
import { createRepositoryHandler, type RepositoryBase, type RepositoryError } from "@vendors/clean";

type Notification =
	| InscriptionNotificationEntity;

export interface NotificationRepository extends RepositoryBase<Notification> {
	generateNotificationId(): NotificationId;
	sendNotificationToEmail(notification: Notification): Promise<RepositoryError | undefined>;
}

export const notificationRepository = createRepositoryHandler<NotificationRepository>();
