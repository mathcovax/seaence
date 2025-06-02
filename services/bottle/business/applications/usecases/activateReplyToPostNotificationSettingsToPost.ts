import { type PostId } from "@business/domains/common/post";
import { UsecaseHandler } from "@vendors/clean";
import { notificationSettingsRepository } from "../repositories/notificationSettings";
import { ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { type UserId } from "@business/domains/entities/user";

interface Input {
	userId: UserId;
	postId: PostId;
}

export class ActivateReplyToPostNotificationSettingsToPostUsecase extends UsecaseHandler.create({
	notificationSettingsRepository,
}) {
	public async execute({ userId, postId }: Input) {
		const replyToPostSettingNotification = ReplyToPostNotificationSettingsEntity.create({
			userId,
			postId,
		});

		return this.notificationSettingsRepository.save(replyToPostSettingNotification);
	}
}
