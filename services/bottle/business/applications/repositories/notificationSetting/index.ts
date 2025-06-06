import { type ReplyToPostNotificationSettingEntity } from "@business/domains/entities/setting/replyToPost";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type NotificationSetting =
	| ReplyToPostNotificationSettingEntity;

export interface NotificationSettingRepository extends RepositoryBase<NotificationSetting> {}

export const notificationSettingRepository = createRepositoryHandler<NotificationSettingRepository>();
