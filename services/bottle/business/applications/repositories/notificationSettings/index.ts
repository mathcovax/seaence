import { type ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type NotificationSettings =
	| ReplyToPostNotificationSettingsEntity;

export interface NotificationSettingsRepository extends RepositoryBase<NotificationSettings> {}

export const notificationSettingsRepository = createRepositoryHandler<NotificationSettingsRepository>();
