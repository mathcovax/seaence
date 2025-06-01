import { type PostId } from "@business/domains/common/post";
import { type User } from "@business/domains/common/user";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { notificationSettingsRepository } from "../repositories/notificationSettings";

interface Input {
	user: User;
	postId: PostId;
}

export class GetReplyPostNotificationSettingsUsecase extends UsecaseHandler.create({
	notificationSettingsRepository,
}) {
	public async execute({ user, postId }: Input) {
		const replyPostNotificationSetting = await this.notificationSettingsRepository
			.findReplyToPostNotificationSetting(
				user,
				postId,
			);
		if (!replyPostNotificationSetting) {
			return new UsecaseError("post.notExist");
		}

		return replyPostNotificationSetting;
	}
}
