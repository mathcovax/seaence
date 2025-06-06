import { type PostId } from "@business/domains/common/post";
import { type ReplyToPostNotificationSettingEntity } from "@business/domains/entities/setting/replyToPost";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
import { type NotificationSetting } from ".";

export interface ReplyToPostNotificationSettingRepository extends RepositoryBase<NotificationSetting> {
	findOneReplyToPostNotificationSetting(
		user: UserEntity,
		postId: PostId,
	): Promise<ReplyToPostNotificationSettingEntity | null>;
	findManyReplyToPostNotificationSetting(
		postId: PostId,
	): AsyncGenerator<ReplyToPostNotificationSettingEntity[]>;
	delete(entity: ReplyToPostNotificationSettingEntity): Promise<void>;
}

export const replyToPostNotificationSettingRepository
	= createRepositoryHandler<ReplyToPostNotificationSettingRepository>();
