import { type PostId } from "@business/domains/common/post";
import { UsecaseHandler } from "@vendors/clean";
import { replyToPostNotificationSettingsRepository } from "../repositories/notificationSettings/replyToPost";
import { type UserEntity } from "@business/domains/entities/user";

interface Input {
	user: UserEntity;
	postId: PostId;
}

export class FindReplyPostNotificationSettingsUsecase extends UsecaseHandler.create({
	replyToPostNotificationSettingsRepository,
}) {
	public async execute({ user, postId }: Input) {
		const replyPostNotificationSetting = await this.replyToPostNotificationSettingsRepository
			.findReplyToPostNotificationSettings(
				user,
				postId,
			);

		return replyPostNotificationSetting;
	}
}
