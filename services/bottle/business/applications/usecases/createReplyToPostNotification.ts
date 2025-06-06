import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";
import { ReplyToPostNotificationEntity, type SummaryOfReplyPost } from "@business/domains/entities/notification/replyToPost";
import { type PostId } from "@business/domains/common/post";
import { notificationSettingRepository } from "../repositories/notificationSetting";
import { type UserId, type Username } from "@business/domains/entities/user";
import { replyToPostNotificationSettingRepository } from "../repositories/notificationSetting/replyToPost";

interface Input {
	postId: PostId;
	userIdOfReplyPost: UserId;
	usernameOfReplyPost: Username;
	summaryOfReplyPost: SummaryOfReplyPost;
}

export class CreateReplyToPostNotificationsUsecase extends UsecaseHandler.create({
	notificationRepository,
	notificationSettingRepository,
	replyToPostNotificationSettingRepository,
}) {
	public async execute({ usernameOfReplyPost, summaryOfReplyPost, postId, userIdOfReplyPost }: Input) {
		for await (
			const settings of this.replyToPostNotificationSettingRepository
				.findManyReplyToPostNotificationSetting(
					postId,
				)
		) {
			await Promise.all(
				settings.map(
					async(setting) => {
						if (setting.user.value.id === userIdOfReplyPost) {
							return;
						}

						const replyToPostNotification = ReplyToPostNotificationEntity.create({
							id: this.notificationRepository.generateNotificationId(),
							user: setting.user,
							postId,
							usernameOfReplyPost,
							summaryOfReplyPost,
						});

						return this.notificationRepository.save(replyToPostNotification);
					},
				),
			);
		}
	}
}
