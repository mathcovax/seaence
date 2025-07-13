import { type ReplyToPostNotificationSettingEntity } from "@business/domains/entities/setting/replyToPost";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type NotificationSetting =
	| ReplyToPostNotificationSettingEntity;

export interface NotificationSettingRepository extends RepositoryBase<NotificationSetting> {
	deleteUserSettings(user: UserEntity): Promise<void>;
}

export const notificationSettingRepository = createRepositoryHandler<NotificationSettingRepository>();
