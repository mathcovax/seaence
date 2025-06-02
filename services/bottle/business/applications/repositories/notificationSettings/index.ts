import { type ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type NotificationSetting =
	| ReplyToPostNotificationSettingsEntity;

export interface NotificationSettingsRepository extends RepositoryBase<NotificationSetting> {}

export const notificationSettingsRepository = createRepositoryHandler<NotificationSettingsRepository>();
