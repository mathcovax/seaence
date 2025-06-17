import { type PostEntity } from "@business/domains/entities/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface notificationRepository extends RepositoryBase {
	enableReplyPostNotificationToAuthor(post: PostEntity): Promise<void>;
}

export const notificationRepository = createRepositoryHandler<
	notificationRepository
>();
