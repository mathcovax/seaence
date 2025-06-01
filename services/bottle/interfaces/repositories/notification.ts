import { uuidv7 } from "uuidv7";
import { match, P } from "ts-pattern";
import { envs } from "@interfaces/envs";
import { mongo } from "@interfaces/providers/mongo";
import { EmailProvider } from "@interfaces/providers/email";
import { notificationRepository } from "@business/applications/repositories/notification";
import { notificationIdObjecter } from "@business/domains/entities/notification/base";
import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { registerTemplate } from "@interfaces/providers/email/templates/registerTemplate";
import { ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";

notificationRepository.default = {
	generateNotificationId() {
		return notificationIdObjecter.unsafeCreate(uuidv7());
	},
	async save(notification) {
		const simpleNotification = notification.toSimpleObject();

		await mongo.notificationCollection.updateOne(
			{
				id: simpleNotification.id,
			},
			{
				$set: simpleNotification,
			},
			{ upsert: true },
		);

		return notification;
	},
	async sendNotification(notification) {
		// prendre en compte la langue de l'utilisateur et lui delivrer la notif dans ca langue

		const { user } = notification.toSimpleObject();

		return match(notification)
			.with(
				P.instanceOf(RegisterNotificationEntity),
				async() => {
					await EmailProvider.send({
						to: user.email,
						subject: "Bienvenue sur Seaence !",
						html: registerTemplate(user.username),
						from: envs.NO_REPLY_EMAIL,
					});
				},
			)
			.with(
				P.instanceOf(ReplyToPostNotificationEntity),
				async() => {},
			)
			.exhaustive();
	},
};
