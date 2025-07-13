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
import { commonDateObjecter, EntityHandler, intObjecter } from "@vendors/clean";
import { UserEntity } from "@business/domains/entities/user";
import { UserPostBanNotificationEntity } from "@business/domains/entities/notification/userPostBan";
import { UserPostWarningNotificationEntity } from "@business/domains/entities/notification/userPostWarning";
import { UserAnswerBanNotificationEntity } from "@business/domains/entities/notification/userAnswerBan";
import { UserAnswerWarningNotificationEntity } from "@business/domains/entities/notification/userAnswerWarning";

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
			.with(
				{ entity: P.instanceOf(UserPostBanNotificationEntity) },
				({ entity }) => ({
					...entity.toSimpleObject(),
					type: "userPostBanNotificationType",
				}),
			)
			.with(
				{ entity: P.instanceOf(UserPostWarningNotificationEntity) },
				({ entity }) => ({
					...entity.toSimpleObject(),
					type: "userPostWarningNotificationType",
				}),
			)
			.with(
				{ entity: P.instanceOf(UserAnswerBanNotificationEntity) },
				({ entity }) => ({
					...entity.toSimpleObject(),
					type: "userAnswerBanNotificationType",
				}),
			)
			.with(
				{ entity: P.instanceOf(UserAnswerWarningNotificationEntity) },
				({ entity }) => ({
					...entity.toSimpleObject(),
					type: "userAnswerWarningNotificationType",
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
			.with(
				{ notification: P.instanceOf(UserPostBanNotificationEntity) },
				() => {
					//
				},
			)
			.with(
				{ notification: P.instanceOf(UserPostWarningNotificationEntity) },
				() => {
					//
				},
			)
			.with(
				{ notification: P.instanceOf(UserAnswerBanNotificationEntity) },
				() => {
					//
				},
			)
			.with(
				{ notification: P.instanceOf(UserAnswerWarningNotificationEntity) },
				() => {
					//
				},
			)
			.exhaustive();
	},
	async findManyNotificationToUser(user, params) {
		const mongoNotifications = await mongo.notificationCollection
			.find({
				"user.id": user.id.value,
			})
			.sort({ createdAt: -1 })
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
			.with(
				{ type: "userPostBanNotificationType" },
				(notification) => EntityHandler.unsafeMapper(
					UserPostBanNotificationEntity,
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
				{ type: "userPostWarningNotificationType" },
				(notification) => EntityHandler.unsafeMapper(
					UserPostWarningNotificationEntity,
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
				{ type: "userAnswerBanNotificationType" },
				(notification) => EntityHandler.unsafeMapper(
					UserAnswerBanNotificationEntity,
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
				{ type: "userAnswerWarningNotificationType" },
				(notification) => EntityHandler.unsafeMapper(
					UserAnswerWarningNotificationEntity,
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
	async findLastNotificationDateToUser(user) {
		const mongoNotification = await mongo.notificationCollection
			.findOne(
				{
					"user.id": user.id.value,
				},
				{
					sort: { createdAt: -1 },
					projection: { createdAt: 1 },
				},
			);

		return mongoNotification
			? commonDateObjecter.unsafeCreate(mongoNotification.createdAt)
			: null;
	},
	async deleteUserNotification(user) {
		await mongo.notificationCollection
			.deleteMany({
				"user.id": user.id.value,
			});
	},
};
