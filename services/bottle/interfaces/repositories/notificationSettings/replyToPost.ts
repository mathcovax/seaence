import { replyToPostNotificationSettingsRepository } from "@business/applications/repositories/notificationSettings/replyToPost";
import { ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { UserEntity } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, RepositoryError } from "@vendors/clean";

replyToPostNotificationSettingsRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async findReplyToPostNotificationSettings(user, postId) {
		const simpleUser = user.toSimpleObject();
		const mongoReplyToPostNotificationSettings = await mongo
			.notificationSettingsCollection
			.findOne(
				{
					user: simpleUser,
					postId: postId.value,
				},
			);

		if (!mongoReplyToPostNotificationSettings) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			ReplyToPostNotificationSettingsEntity,
			{
				...mongoReplyToPostNotificationSettings,
				user: EntityHandler.unsafeMapper(
					UserEntity,
					mongoReplyToPostNotificationSettings.user,
				),
			},
		);
	},
	async *findReplyToPostNotificationsSettings(postId) {
		const quantityPerPage = 10;

		for (let page = 0; true; page++) {
			const mongoNotificationSettings = await mongo.notificationSettingsCollection
				.find({ postId: postId.value })
				.skip(page * quantityPerPage)
				.limit(quantityPerPage)
				.toArray();

			if (!mongoNotificationSettings.length) {
				break;
			}

			const notificationSettings = mongoNotificationSettings.map(
				(settings) => EntityHandler.unsafeMapper(
					ReplyToPostNotificationSettingsEntity,
					{
						...settings,
						user: EntityHandler.unsafeMapper(
							UserEntity,
							settings.user,
						),
					},
				),
			);

			yield notificationSettings;
		}
	},
	async delete(entity) {
		const simpleEntity = entity.toSimpleObject();

		await mongo.notificationSettingsCollection.deleteOne({
			user: simpleEntity.user,
			postId: simpleEntity.postId,
		});
	},
};
