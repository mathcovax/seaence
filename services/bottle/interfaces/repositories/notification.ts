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
					type: "register",
				}),
			)
			.with(
				{ entity: P.instanceOf(ReplyToPostNotificationEntity) },
				({ entity }) => ({
					...entity.toSimpleObject(),
					type: "replyToPost",
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
	async sendNotification(notification, user) {
		const simpleUser = user.toSimpleObject();

		await match({ notification })
			.with(
				{ notification: P.instanceOf(RegisterNotificationEntity) },
				async() => {
					await EmailProvider.send({
						to: simpleUser.email,
						subject: "Bienvenue sur Seaence !",
						html: registerTemplate(simpleUser.username),
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
};
