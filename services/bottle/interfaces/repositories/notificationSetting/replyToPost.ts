import { replyToPostNotificationSettingRepository } from "@business/applications/repositories/notificationSetting/replyToPost";
import { ReplyToPostNotificationSettingEntity } from "@business/domains/entities/setting/replyToPost";
import { UserEntity } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, RepositoryError } from "@vendors/clean";

replyToPostNotificationSettingRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async findOneReplyToPostNotificationSetting(user, postId) {
		const mongoReplyToPostNotificationSetting = await mongo
			.notificationSettingCollection
			.findOne(
				{
					"user.id": user.id.value,
					postId: postId.value,
					type: "replyToPostNotificationSettingType",
				},
			);

		if (!mongoReplyToPostNotificationSetting) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			ReplyToPostNotificationSettingEntity,
			{
				...mongoReplyToPostNotificationSetting,
				user: EntityHandler.unsafeMapper(
					UserEntity,
					mongoReplyToPostNotificationSetting.user,
				),
			},
		);
	},
	async *findManyReplyToPostNotificationSetting(postId) {
		const quantityPerPage = 10;

		for (let page = 0; true; page++) {
			const mongoNotificationSettings = await mongo.notificationSettingCollection
				.find({ postId: postId.value })
				.skip(page * quantityPerPage)
				.limit(quantityPerPage)
				.toArray();

			if (!mongoNotificationSettings.length) {
				break;
			}

			const notificationSettings = mongoNotificationSettings.map(
				(setting) => EntityHandler.unsafeMapper(
					ReplyToPostNotificationSettingEntity,
					{
						...setting,
						user: EntityHandler.unsafeMapper(
							UserEntity,
							setting.user,
						),
					},
				),
			);

			yield notificationSettings;
		}
	},
	async delete(entity) {
		await mongo.notificationSettingCollection.deleteOne({
			"user.id": entity.user.value.id.value,
			postId: entity.postId.value,
		});
	},
};
