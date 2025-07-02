import { type AnswerId } from "@business/domains/common/answer";
import { type PostId } from "@business/domains/common/post";
import { type WarningId, type WarningReason } from "@business/domains/common/warning";
import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";
import { UserAnswerWarningNotificationEntity } from "@business/domains/entities/notification/userAnswerWarning";
import { userObjecter } from "@business/domains/common/user";

interface Input {
	user: UserEntity;
	warningId: WarningId;
	postId: PostId;
	answerId: AnswerId;
	reason: WarningReason;
}

export class CreateUserAnswerWarningNotificationUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public execute({ user, warningId, postId, answerId, reason }: Input) {
		const warningNotification = UserAnswerWarningNotificationEntity.create({
			id: this.notificationRepository.generateNotificationId(),
			warningId,
			postId,
			answerId,
			reason,
			user: userObjecter.unsafeCreate(user),
		});

		return this.notificationRepository.save(warningNotification);
	}
}
