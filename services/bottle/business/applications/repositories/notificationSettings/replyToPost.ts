import { type PostId } from "@business/domains/common/post";
import { type ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
import { type NotificationSettings } from ".";

export interface ReplyToPostNotificationSettingsRepository extends RepositoryBase<NotificationSettings> {
	findReplyToPostNotificationSettings(
		user: UserEntity,
		postId: PostId,
	): Promise<ReplyToPostNotificationSettingsEntity | null>;
	findReplyToPostNotificationsSettings(
		postId: PostId,
	): AsyncGenerator<ReplyToPostNotificationSettingsEntity[]>;
}

export const replyToPostNotificationSettingsRepository
	= createRepositoryHandler<ReplyToPostNotificationSettingsRepository>();
