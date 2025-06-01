import { type PostId } from "@business/domains/common/post";
import { type UserId } from "@business/domains/common/user";
import { UsecaseHandler } from "@vendors/clean";
import { notificationSettingsRepository } from "../repositories/notificationSettings";
import { ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { type Activated } from "@business/domains/entities/settings/base";

interface Input {
	userId: UserId;
	postId: PostId;
	activated: Activated;
}

export class DefineReplyToPostNotificationSettingsUsecase extends UsecaseHandler.create({
	notificationSettingsRepository,
}) {
	public async execute({ userId, postId, activated }: Input) {
		const replyToPostSettingNotification = ReplyToPostNotificationSettingsEntity.create({
			userId,
			postId,
			activated,
		});

		return this.notificationSettingsRepository.save(replyToPostSettingNotification);
	}
}
