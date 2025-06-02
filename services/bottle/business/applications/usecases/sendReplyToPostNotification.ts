import { UsecaseHandler } from "@vendors/clean";
import { replyToPostNotificationRepository } from "../repositories/notification/replyToPost";
import { notificationRepository } from "../repositories/notification";

export class SendReplyToPostNotificationUsecase extends UsecaseHandler.create({
	replyToPostNotificationRepository,
	notificationRepository,
}) {
	public async execute() {
		for await (
			const notications of this.replyToPostNotificationRepository
				.findUnprocessedReplyToPostNotifications()
		) {
			await Promise.all(
				notications.map(
					async(notication) => {
						const replyToPostNotification = notication.process();

						await this.notificationRepository.save(replyToPostNotification);
					},
				),
			);
		}
	}
}
