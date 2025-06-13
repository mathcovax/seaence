import { type UserEntity } from "@business/domains/entities/user";
import { type UserWarningId, type UserWarningReason } from "@business/domains/entities/warning/base";
import { type PostUserWarningPostId } from "@business/domains/entities/warning/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface InputCreateUserPostBanNotification {
	user: UserEntity;
	warningId: UserWarningId;
	postId: PostUserWarningPostId;
	reason: UserWarningReason;
}

interface InputCreateUserPostWarningNotification {
	user: UserEntity;
	warningId: UserWarningId;
	postId: PostUserWarningPostId;
	reason: UserWarningReason;
}

export interface NotificationRepository extends RepositoryBase<never> {
	createUserPostBanNotification(params: InputCreateUserPostBanNotification): Promise<unknown>;
	createUserPostWarningNotification(params: InputCreateUserPostWarningNotification): Promise<unknown>;
}

export const notificationRepository = createRepositoryHandler<NotificationRepository>();
