import { type AnswerId } from "@business/domains/common/answer";
import { type PostId } from "@business/domains/common/post";
import { type WarningId, type WarningReason } from "@business/domains/common/warning";
import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../../repositories/notification";
import { UserAnswerBanNotificationEntity } from "@business/domains/entities/notification/userAnswerBan";
import { userObjecter } from "@business/domains/common/user";

interface Input {
	user: UserEntity;
	warningId: WarningId;
	postId: PostId;
	answerId: AnswerId;
	reason: WarningReason;
}

export class CreateUserAnswerBanNotificationUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public execute({ user, warningId, postId, answerId, reason }: Input) {
		const banNotification = UserAnswerBanNotificationEntity.create({
			id: this.notificationRepository.generateNotificationId(),
			warningId,
			postId,
			answerId,
			reason,
			user: userObjecter.unsafeCreate(user),
		});

		return this.notificationRepository.save(banNotification);
	}
}
