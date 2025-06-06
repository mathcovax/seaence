import { type PostId } from "@business/domains/common/post";
import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { replyToPostNotificationSettingRepository } from "../repositories/notificationSetting/replyToPost";

interface Input {
	user: UserEntity;
	postId: PostId;
}

export class FindOneReplyToPostNotificationSettingToUserByPostIdUsecase extends UsecaseHandler.create({
	replyToPostNotificationSettingRepository,
}) {
	public execute({ user, postId }: Input) {
		return this.replyToPostNotificationSettingRepository.findOneReplyToPostNotificationSetting(
			user,
			postId,
		);
	}
}
