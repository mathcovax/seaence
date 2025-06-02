import { type NotificationId } from "@business/domains/entities/notification/base";
import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { type UserId, type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type PositiveInt, type Int, type RepositoryBase } from "@vendors/clean";

export type Notification =
	| RegisterNotificationEntity
	| ReplyToPostNotificationEntity;

interface FindProcessedNotificationToUserParams {
	page: Int;
	quantityPerPage: PositiveInt;
}

export interface NotificationRepository extends RepositoryBase<Notification> {
	generateNotificationId(): NotificationId;
	sendNotification(notification: Notification, user: UserEntity): Promise<void>;
	findProcessedNotificationToUser(
		userId: UserId,
		params: FindProcessedNotificationToUserParams
	): Promise<Notification[]>;
}

export const notificationRepository = createRepositoryHandler<NotificationRepository>();
