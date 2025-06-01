import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";
import { type Username, type User } from "@business/domains/common/user";
import { ReplyToPostNotificationEntity, type SummaryOfReplyPost } from "@business/domains/entities/notification/replyToPost";
import { type PostId } from "@business/domains/common/post";
import { notificationSettingsRepository } from "../repositories/notificationSettings";
import { GetReplyPostNotificationSettingsUsecase } from "./getReplyPostNotificationSettings";

interface Input {
	user: User;
	postId: PostId;
	usernameOfReplyPost: Username;
	summaryOfReplyPost: SummaryOfReplyPost;
}

export class CreateAndSendReplyToPostNotificationUsecase extends UsecaseHandler.create({
	notificationRepository,
	notificationSettingsRepository,
	getReplyPostNotificationSettingsUsecase: GetReplyPostNotificationSettingsUsecase,
}) {
	public async execute({ user, usernameOfReplyPost, summaryOfReplyPost, postId }: Input) {
		const setting = await this.getReplyPostNotificationSettingsUsecase({
			user,
			postId,
		});

		if (setting instanceof Error) {
			return setting;
		}

		if (!setting.activated.value) {
			return;
		}

		const replyToPostNotification = ReplyToPostNotificationEntity.create({
			id: this.notificationRepository.generateNotificationId(),
			user,
			postId,
			usernameOfReplyPost,
			summaryOfReplyPost,
		});

		await this.notificationRepository.save(replyToPostNotification);

		await this.notificationRepository.sendNotification(replyToPostNotification);

		await this.notificationRepository.save(replyToPostNotification.process());
	}
}
