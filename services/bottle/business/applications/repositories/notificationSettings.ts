import { type PostId } from "@business/domains/common/post";
import { type User } from "@business/domains/common/user";
import { type ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type NotificationSetting =
	| ReplyToPostNotificationSettingsEntity;

export interface NotificationSettingsRepository extends RepositoryBase<NotificationSetting> {
	findReplyToPostNotificationSetting(
		user: User,
		postId: PostId,
	): Promise<ReplyToPostNotificationSettingsEntity | null>;
}

export const notificationSettingsRepository = createRepositoryHandler<NotificationSettingsRepository>();
