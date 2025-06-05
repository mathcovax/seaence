import { uuidv7 } from "uuidv7";
import { match, P } from "ts-pattern";
import { envs } from "@interfaces/envs";
import { mongo } from "@interfaces/providers/mongo";
import { EmailProvider } from "@interfaces/providers/email";
import { type Notification, notificationRepository } from "@business/applications/repositories/notification";
import { notificationIdObjecter } from "@business/domains/entities/notification/base";
import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { registerTemplate } from "@interfaces/providers/email/templates/registerTemplate";
import { ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { type MongoNotification } from "@interfaces/providers/mongo/entities/notification";
import { EntityHandler, intObjecter } from "@vendors/clean";
import { UserEntity } from "@business/domains/entities/user";

notificationRepository.default = {
	generateNotificationId() {
		return notificationIdObjecter.unsafeCreate(uuidv7());
	},
	async save(entity) {
		const simpleEntity = match({ entity: entity as Notification })
			.returnType<MongoNotification>()
			.with(
				{ entity: P.instanceOf(RegisterNotificationEntity) },
				({ entity }) => ({
					...entity.toSimpleObject(),
					type: "registerNotificationType",
				}),
			)
			.with(
				{ entity: P.instanceOf(ReplyToPostNotificationEntity) },
				({ entity }) => ({
					...entity.toSimpleObject(),
					type: "replyToPostNotificationType",
				}),
			)
			.exhaustive();

		await mongo.notificationCollection.updateOne(
			{
				id: simpleEntity.id,
			},
			{
				$set: simpleEntity,
			},
			{ upsert: true },
		);

		return entity;
	},
	async sendNotification(notification) {
		const simpleNotification = notification.toSimpleObject();

		await match({ notification })
			.with(
				{ notification: P.instanceOf(RegisterNotificationEntity) },
				async() => {
					await EmailProvider.send({
						to: simpleNotification.user.email,
						subject: "Bienvenue sur Seaence !",
						html: registerTemplate(simpleNotification.user.username),
						from: envs.NO_REPLY_EMAIL,
					});
				},
			)
			.with(
				{ notification: P.instanceOf(ReplyToPostNotificationEntity) },
				() => {
					//
				},
			)
			.exhaustive();
	},
	async findNotificationToUser(user, params) {
		const mongoNotifications = await mongo.notificationCollection
			.find({
				"user.id": user.id.value,
			})
			.skip(params.page.value * params.quantityPerPage.value)
			.limit(params.quantityPerPage.value)
			.toArray();

		return mongoNotifications.map((notification) => match(notification)
			.with(
				{ type: "registerNotificationType" },
				(notification) => EntityHandler.unsafeMapper(
					RegisterNotificationEntity,
					{
						...notification,
						user: EntityHandler.unsafeMapper(
							UserEntity,
							notification.user,
						),
					},
				),
			)
			.with(
				{ type: "replyToPostNotificationType" },
				(notification) => EntityHandler.unsafeMapper(
					ReplyToPostNotificationEntity,
					{
						...notification,
						user: EntityHandler.unsafeMapper(
							UserEntity,
							notification.user,
						),
					},
				),
			)
			.exhaustive());
	},
	async countNotificationToUser(user) {
		return mongo.notificationCollection
			.countDocuments(
				{
					"user.id": user.id.value,
				},
			)
			.then(
				(count) => intObjecter.unsafeCreate(count),
			);
	},
};
