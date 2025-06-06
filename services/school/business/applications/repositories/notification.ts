import { type PostEntity } from "@business/domains/entities/post";
import { type UserEntity } from "@business/domains/entities/user";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface notificationRepository extends RepositoryBase {
	enableNotification(post: PostEntity, user: UserEntity): Promise<void>;
}

export const notificationRepository = createRepositoryHandler<
	notificationRepository
>();
