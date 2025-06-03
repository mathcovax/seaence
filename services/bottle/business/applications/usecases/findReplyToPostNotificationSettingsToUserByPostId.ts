import { type PostId } from "@business/domains/common/post";
import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { replyToPostNotificationRepository } from "../repositories/notification/replyToPost";

interface Input {
	user: UserEntity;
	postId: PostId;
}

export class FindReplyToPostNotificationSettingsToUserByPostIdUsecase extends UsecaseHandler.create({
	replyToPostNotificationRepository,
}) {
	public execute({ user, postId }: Input) {
		return this.replyToPostNotificationRepository.findReplyToPostNotificationByPostId(
			user,
			postId,
		);
	}
}
