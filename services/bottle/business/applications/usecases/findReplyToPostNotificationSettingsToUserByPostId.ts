import { type PostId } from "@business/domains/common/post";
import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { replyToPostNotificationSettingsRepository } from "../repositories/notificationSettings/replyToPost";

interface Input {
	user: UserEntity;
	postId: PostId;
}

export class FindReplyToPostNotificationSettingsToUserByPostIdUsecase extends UsecaseHandler.create({
	replyToPostNotificationSettingsRepository,
}) {
	public execute({ user, postId }: Input) {
		return this.replyToPostNotificationSettingsRepository.findReplyToPostNotificationSettings(
			user,
			postId,
		);
	}
}
