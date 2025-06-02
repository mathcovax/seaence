import { replyToPostNotificationRepository } from "@business/applications/repositories/notification/replyToPost";
import { ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { mongo } from "@interfaces/providers/mongo";
import { type MongoReplyToPostNotification } from "@interfaces/providers/mongo/entities/notification";
import { EntityHandler, RepositoryError } from "@vendors/clean";

const zero = 0;

replyToPostNotificationRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async *findUnprocessedReplyToPostNotifications() {
		const top = 10;
		let skip = 0;
		let hasMore = true;

		while (hasMore) {
			const mongoNotifications = await mongo.notificationCollection
				.find(
					{
						processed: false,
						type: "replyToPost",
					},
				)
				.skip(skip)
				.limit(top)
				.toArray();

			if (mongoNotifications.length === zero) {
				hasMore = false;
				return;
			}

			const notifications = mongoNotifications.map(
				(notification) => EntityHandler.unsafeMapper(
					ReplyToPostNotificationEntity,
					// claquer au sol mongodb
					notification as MongoReplyToPostNotification,
				),
			);

			yield notifications;

			skip += top;
			hasMore = mongoNotifications.length === top;
		}
	},
};
