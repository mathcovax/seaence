import { type EntityToSimpleObject } from "@vendors/clean";
import { type ReplyToPostNotificationSettingEntity } from "@business/domains/entities/setting/replyToPost";

export interface MongoReplyToPostNotificationSetting extends EntityToSimpleObject<
	typeof ReplyToPostNotificationSettingEntity
> {}

export type MongoNotificationSetting =
	| MongoReplyToPostNotificationSetting;

