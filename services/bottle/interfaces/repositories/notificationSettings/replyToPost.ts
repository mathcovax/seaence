import { replyToPostNotificationSettingsRepository } from "@business/applications/repositories/notificationSettings/replyToPost";
import { ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, RepositoryError } from "@vendors/clean";

const zero = 0;

replyToPostNotificationSettingsRepository.default = {
	save() {
		throw new RepositoryError("unsupportedMethod");
	},
	async findReplyToPostNotificationSettings(userId, postId) {
		const mongoReplyToPostNotificationSettings = await mongo
			.notificationSettingsCollection
			.findOne(
				{
					userId: userId.value,
					postId: postId.value,
				},
			);

		if (!mongoReplyToPostNotificationSettings) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			ReplyToPostNotificationSettingsEntity,
			mongoReplyToPostNotificationSettings,
		);
	},
	async *findReplyToPostNotificationsSettings(postId) {
		const top = 10;
		let skip = 0;
		let hasMore = true;

		while (hasMore) {
			const mongoNotificationSettings = await mongo.notificationSettingsCollection
				.find({ postId: postId.value })
				.skip(skip)
				.limit(top)
				.toArray();

			if (mongoNotificationSettings.length === zero) {
				hasMore = false;
				return;
			}

			const notificationSettings = mongoNotificationSettings.map(
				(settings) => EntityHandler.unsafeMapper(
					ReplyToPostNotificationSettingsEntity,
					settings,
				),
			);

			yield notificationSettings;

			skip += top;
			hasMore = mongoNotificationSettings.length === top;
		}
	},
};
