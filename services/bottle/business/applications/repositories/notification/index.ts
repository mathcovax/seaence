import { type NotificationId } from "@business/domains/entities/notification/base";
import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { type UserPostBanNotificationEntity } from "@business/domains/entities/notification/userPostBan";
import { type UserPostWarningNotificationEntity } from "@business/domains/entities/notification/userPostWarning";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type PositiveInt, type Int, type RepositoryBase } from "@vendors/clean";

export type Notification =
	| RegisterNotificationEntity
	| ReplyToPostNotificationEntity
	| UserPostBanNotificationEntity
	| UserPostWarningNotificationEntity;

interface FindProcessedNotificationToUserParams {
	page: Int;
	quantityPerPage: PositiveInt;
}

export interface NotificationRepository extends RepositoryBase<Notification> {
	generateNotificationId(): NotificationId;
	sendNotification(notification: Notification): Promise<void>;
	findManyNotificationToUser(
		user: UserEntity,
		params: FindProcessedNotificationToUserParams
	): Promise<Notification[]>;
	countNotificationToUser(user: UserEntity): Promise<Int>;
}

export const notificationRepository = createRepositoryHandler<NotificationRepository>();
