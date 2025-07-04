import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { type UserAnswerBanNotificationEntity } from "@business/domains/entities/notification/userAnswerBan";
import { type UserAnswerWarningNotificationEntity } from "@business/domains/entities/notification/userAnswerWarning";
import { type UserPostBanNotificationEntity } from "@business/domains/entities/notification/userPostBan";
import { type UserPostWarningNotificationEntity } from "@business/domains/entities/notification/userPostWarning";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoRegisterNotification extends EntityToSimpleObject<typeof RegisterNotificationEntity> {}
export interface MongoReplyToPostNotification extends EntityToSimpleObject<typeof ReplyToPostNotificationEntity> {}
export interface MongoUserPostBanNotification extends EntityToSimpleObject<typeof UserPostBanNotificationEntity> {}
export interface MongoUserPostWarningNotification extends EntityToSimpleObject<
	typeof UserPostWarningNotificationEntity
> {}
export interface MongoUserAnswerBanNotification extends EntityToSimpleObject<typeof UserAnswerBanNotificationEntity> {}
export interface MongoUserAnswerWarningNotification extends EntityToSimpleObject<
	typeof UserAnswerWarningNotificationEntity
> {}

export type MongoNotification =
	| MongoRegisterNotification
	| MongoReplyToPostNotification
	| MongoUserPostBanNotification
	| MongoUserPostWarningNotification
	| MongoUserAnswerBanNotification
	| MongoUserAnswerWarningNotification;
