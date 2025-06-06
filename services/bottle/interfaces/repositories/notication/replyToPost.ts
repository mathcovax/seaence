import { replyToPostNotificationRepository } from "@business/applications/repositories/notification/replyToPost";
import { ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { UserEntity } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, RepositoryError } from "@vendors/clean";

replyToPostNotificationRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async findOneReplyToPostNotificationByPostId(user, postId) {
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
					expectType: "replyToPostNotificationType",
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

