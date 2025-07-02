import { type PostId } from "@business/domains/common/post";
import { type UserEntity } from "@business/domains/entities/user";
import { type AnswerUserWarningAnswerId } from "@business/domains/entities/warning/answer";
import { type UserWarningId, type UserWarningReason } from "@business/domains/entities/warning/base";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface InputCreateUserNotification {
	user: UserEntity;
	warningId: UserWarningId;
	reason: UserWarningReason;
}
interface InputCreateUserPostBanNotification extends InputCreateUserNotification {
	postId: PostId;
}

interface InputCreateUserPostWarningNotification extends InputCreateUserNotification {
	postId: PostId;
}

interface InputCreateUserAnswerBanNotification extends InputCreateUserNotification {
	postId: PostId;
	answerId: AnswerUserWarningAnswerId;
}

interface InputCreateUserAnswerWarningNotification extends InputCreateUserNotification {
	postId: PostId;
	answerId: AnswerUserWarningAnswerId;
}

export interface NotificationRepository extends RepositoryBase<never> {
	createUserPostBanNotification(params: InputCreateUserPostBanNotification): Promise<unknown>;
	createUserPostWarningNotification(params: InputCreateUserPostWarningNotification): Promise<unknown>;
	createUserAnswerBanNotification(params: InputCreateUserAnswerBanNotification): Promise<unknown>;
	createUserAnswerWarningNotification(params: InputCreateUserAnswerWarningNotification): Promise<unknown>;
}

export const notificationRepository = createRepositoryHandler<NotificationRepository>();
