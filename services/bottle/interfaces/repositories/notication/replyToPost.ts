import { replyToPostNotificationRepository } from "@business/applications/repositories/notification/replyToPost";
import { ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { UserEntity } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, RepositoryError } from "@vendors/clean";

replyToPostNotificationRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async *findUnprocessedReplyToPostNotifications() {
		const quantityPerPage = 10;

		for (let page = 0; true; page++) {
			const mongoNotifications = await mongo.notificationCollection
				.find(
					{
						processed: false,
						type: "replyToPostNotificationType",
					},
				)
				.skip(page * quantityPerPage)
				.limit(quantityPerPage)
				.toArray();

			if (!mongoNotifications.length) {
				break;
			}

			const notifications = mongoNotifications.map(
				(notification) => {
					if (notification.type !== "replyToPostNotificationType") {
						throw new RepositoryError(
							"wrong-notification-type",
							{
								notification,
								expectType: "registerNotificationType",
							},
						);
					}

					return EntityHandler.unsafeMapper(
						ReplyToPostNotificationEntity,
						{
							...notification,
							user: EntityHandler.unsafeMapper(
								UserEntity,
								notification.user,
							),
						},
					);
				},
			);

			yield notifications;
		}
	},
	async findReplyToPostNotificationByPostId(user, postId) {
		const mongoReplyToPostNotification = await mongo.notificationCollection
			.findOne(
				{
					"user.id": user.id.value,
					type: "replyToPostNotificationType",
					postId: postId.value,
				},
			);

		if (!mongoReplyToPostNotification) {
			return null;
		}

		if (mongoReplyToPostNotification.type !== "replyToPostNotificationType") {
			throw new RepositoryError(
				"wrong-notification-type",
				{
					mongoReplyToPostNotification,
					expectType: "replyToPost",
				},
			);
		}

		return EntityHandler.unsafeMapper(
			ReplyToPostNotificationEntity,
			{
				...mongoReplyToPostNotification,
				user: EntityHandler.unsafeMapper(
					UserEntity,
					mongoReplyToPostNotification.user,
				),
			},
		);
	},
};

