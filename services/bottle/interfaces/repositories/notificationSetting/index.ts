import { type NotificationSetting, notificationSettingRepository } from "@business/applications/repositories/notificationSetting";
import { notificationSettingIdObjecter } from "@business/domains/entities/setting/base";
import { ReplyToPostNotificationSettingEntity } from "@business/domains/entities/setting/replyToPost";
import { mongo } from "@interfaces/providers/mongo";
import { type MongoNotificationSetting } from "@interfaces/providers/mongo/entities/notificationSettings";
import { match, P } from "ts-pattern";
import { uuidv7 } from "uuidv7";

notificationSettingRepository.default = {
	generateId() {
		return notificationSettingIdObjecter.unsafeCreate(uuidv7());
	},
	async save(entity) {
		const simpleEntity = match({ entity: entity as NotificationSetting })
			.returnType<MongoNotificationSetting>()
			.with(
				{ entity: P.instanceOf(ReplyToPostNotificationSettingEntity) },
				({ entity }) => entity.toSimpleObject(),
			)
			.exhaustive();

		await mongo.notificationSettingCollection.updateOne(
			{
				"user.id": simpleEntity.user.id,
				postId: simpleEntity.postId,
				type: simpleEntity.type,
			},
			{
				$set: simpleEntity,
			},
			{ upsert: true },
		);

		return entity;
	},
	async deleteUserSettings(user) {
		await mongo.notificationSettingCollection
			.deleteMany({
				"user.id": user.id.value,
			});
	},
};
