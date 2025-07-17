import { type PostId } from "@business/domains/common/post";
import { type WarningId, type WarningReason } from "@business/domains/common/warning";
import { UserPostBanNotificationEntity } from "@business/domains/entities/notification/userPostBan";
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

export class CreateUserPostBanNotificationUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public execute({ user, warningId, postId, reason }: Input) {
		const banNotification = UserPostBanNotificationEntity.create({
			id: this.notificationRepository.generateId(),
			warningId,
			postId,
			reason,
			user: userObjecter.unsafeCreate(user),
		});

		return this.notificationRepository.save(banNotification);
	}
}
