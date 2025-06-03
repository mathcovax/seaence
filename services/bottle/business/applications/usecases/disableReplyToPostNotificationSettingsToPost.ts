import { type PostId } from "@business/domains/common/post";
import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { replyToPostNotificationSettingsRepository } from "../repositories/notificationSettings/replyToPost";

interface Input {
	user: UserEntity;
	postId: PostId;
}

export class DisableReplyToPostNotificationSettingsToPostUsecase extends UsecaseHandler.create({
	replyToPostNotificationSettingsRepository,
}) {
	public async execute({ user, postId }: Input) {
		const replyToPostSettingNotification = await this.replyToPostNotificationSettingsRepository
			.findReplyToPostNotificationSettings(user, postId);

		if (!replyToPostSettingNotification) {
			return;
		}

		await this.replyToPostNotificationSettingsRepository.delete(replyToPostSettingNotification);
	}
}
