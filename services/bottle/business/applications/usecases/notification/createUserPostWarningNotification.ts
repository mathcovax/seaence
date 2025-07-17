import { type PostId } from "@business/domains/common/post";
import { type WarningReason, type WarningId } from "@business/domains/common/warning";
import { UserPostWarningNotificationEntity } from "@business/domains/entities/notification/userPostWarning";
import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../../repositories/notification";
import { userObjecter } from "@business/domains/common/user";

interface Input {
	user: UserEntity;
	warningId: WarningId;
	postId: PostId;
	reason: WarningReason;
}

export class CreateUserPostWarningNotificationUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public execute({ user, warningId, postId, reason }: Input) {
		const warningNotification = UserPostWarningNotificationEntity.create({
			id: this.notificationRepository.generateId(),
			warningId,
			postId,
			reason,
			user: userObjecter.unsafeCreate(user),
		});

		return this.notificationRepository.save(warningNotification);
	}
}
