import { type PostId } from "@business/domains/common/post";
import { UsecaseHandler } from "@vendors/clean";
import { notificationSettingRepository } from "../repositories/notificationSetting";
import { ReplyToPostNotificationSettingEntity } from "@business/domains/entities/setting/replyToPost";
import { type UserEntity } from "@business/domains/entities/user";
import { userObjecter } from "@business/domains/common/user";

interface Input {
	user: UserEntity;
	postId: PostId;
}

export class EnableReplyToPostNotificationSettingToPostUsecase extends UsecaseHandler.create({
	notificationSettingRepository,
}) {
	public async execute({ user, postId }: Input) {
		const replyToPostSettingNotification = ReplyToPostNotificationSettingEntity.create({
			user: userObjecter.unsafeCreate(user),
			postId,
		});

		return this.notificationSettingRepository.save(replyToPostSettingNotification);
	}
}
