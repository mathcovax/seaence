import { type EntityToSimpleObject } from "@vendors/clean";
import { type ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";

export interface MongoReplyToPostNotificationSettings extends EntityToSimpleObject<
	typeof ReplyToPostNotificationSettingsEntity
> {}

export type MongoNotificationSettings =
	| MongoReplyToPostNotificationSettings;

