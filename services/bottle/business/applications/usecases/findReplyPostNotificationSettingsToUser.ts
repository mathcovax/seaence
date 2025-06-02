import { type PostId } from "@business/domains/common/post";
import { UsecaseHandler } from "@vendors/clean";
import { type UserId } from "@business/domains/entities/user";
import { replyToPostNotificationSettingsRepository } from "../repositories/notificationSettings/replyToPost";

interface Input {
	userId: UserId;
	postId: PostId;
}

export class FindReplyPostNotificationSettingsUsecase extends UsecaseHandler.create({
	replyToPostNotificationSettingsRepository,
}) {
	public async execute({ userId, postId }: Input) {
		const replyPostNotificationSetting = await this.replyToPostNotificationSettingsRepository
			.findReplyToPostNotificationSettings(
				userId,
				postId,
			);

		return replyPostNotificationSetting;
	}
}
