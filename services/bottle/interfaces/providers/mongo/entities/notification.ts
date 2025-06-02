import { type RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoRegisterNotification extends EntityToSimpleObject<typeof RegisterNotificationEntity> {
	type: "register";
}
export interface MongoReplyToPostNotification extends EntityToSimpleObject<typeof ReplyToPostNotificationEntity> {
	type: "replyToPost";
}

export type MongoNotification =
	| MongoRegisterNotification
	| MongoReplyToPostNotification;
