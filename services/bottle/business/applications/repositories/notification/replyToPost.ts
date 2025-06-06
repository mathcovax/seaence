import { type PostId } from "@business/domains/common/post";
import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface ReplyToPostNotificationRepository extends RepositoryBase<ReplyToPostNotificationEntity> {
	findOneReplyToPostNotificationByPostId(
		user: UserEntity,
		postId: PostId
	): Promise<ReplyToPostNotificationEntity | null>;
}

export const replyToPostNotificationRepository = createRepositoryHandler<
	ReplyToPostNotificationRepository
>();
