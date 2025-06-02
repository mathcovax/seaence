import { type ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface ReplyToPostNotificationRepository extends RepositoryBase<ReplyToPostNotificationEntity> {
	findUnprocessedReplyToPostNotifications(): AsyncGenerator<ReplyToPostNotificationEntity[]>;
}

export const replyToPostNotificationRepository = createRepositoryHandler<
	ReplyToPostNotificationRepository
>();
