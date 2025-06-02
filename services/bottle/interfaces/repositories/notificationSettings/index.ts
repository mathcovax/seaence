import { type NotificationSetting, notificationSettingsRepository } from "@business/applications/repositories/notificationSettings";
import { ReplyToPostNotificationSettingsEntity } from "@business/domains/entities/settings/replyToPost";
import { mongo } from "@interfaces/providers/mongo";
import { type MongoNotificationSettings } from "@interfaces/providers/mongo/entities/notificationSettings";
import { match, P } from "ts-pattern";

notificationSettingsRepository.default = {
	async save(entity) {
		const simpleEntity = match({ entity: entity as NotificationSetting })
			.returnType<MongoNotificationSettings>()
			.with(
				{ entity: P.instanceOf(ReplyToPostNotificationSettingsEntity) },
				({ entity }) => ({
					...entity.toSimpleObject(),
					type: "replyToPost",
				}),
			)
			.exhaustive();

		await mongo.notificationSettingsCollection.updateOne(
			{
				userId: simpleEntity.userId,
				postId: simpleEntity.postId,
				type: "replyToPost",
			},
			{
				$set: simpleEntity,
			},
			{ upsert: true },
		);

		return entity;
	},
};
