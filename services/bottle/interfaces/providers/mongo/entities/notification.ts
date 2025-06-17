import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { type UserPostBanNotificationEntity } from "@business/domains/entities/notification/userPostBan";
import { type UserPostWarningNotificationEntity } from "@business/domains/entities/notification/userPostWarning";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoRegisterNotification extends EntityToSimpleObject<typeof RegisterNotificationEntity> {}
export interface MongoReplyToPostNotification extends EntityToSimpleObject<typeof ReplyToPostNotificationEntity> {}
export interface MongoUserPostBanNotification extends EntityToSimpleObject<typeof UserPostBanNotificationEntity> {}
export interface MongoUserPostWarningNotification extends EntityToSimpleObject<
	typeof UserPostWarningNotificationEntity
> {}

export type MongoNotification =
	| MongoRegisterNotification
	| MongoReplyToPostNotification
	| MongoUserPostBanNotification
	| MongoUserPostWarningNotification;
