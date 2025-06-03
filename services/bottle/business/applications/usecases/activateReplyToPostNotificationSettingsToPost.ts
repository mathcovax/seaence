import { type PostId } from "@business/domains/common/post";
import { UsecaseHandler } from "@vendors/clean";
import { notificationSettingsRepository } from "../repositories/notificationSettings";
import { ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { type UserEntity } from "@business/domains/entities/user";
import { userObjecter } from "@business/domains/common/user";

interface Input {
	user: UserEntity;
	postId: PostId;
}

export class ActivateReplyToPostNotificationSettingsToPostUsecase extends UsecaseHandler.create({
	notificationSettingsRepository,
}) {
	public async execute({ user, postId }: Input) {
		const replyToPostSettingNotification = ReplyToPostNotificationSettingsEntity.create({
			user: userObjecter.unsafeCreate(user),
			postId,
		});

		return this.notificationSettingsRepository.save(replyToPostSettingNotification);
	}
}
