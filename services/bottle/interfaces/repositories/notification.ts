import { uuidv7 } from "uuidv7";
import { match, P } from "ts-pattern";
import { envs } from "@interfaces/envs";
import { RepositoryError } from "@vendors/clean";
import { mongo } from "@interfaces/providers/mongo";
import { EmailProvider } from "@interfaces/providers/email";
import { notificationRepository } from "@business/applications/repositories/notification";
import { notificationIdObjecter } from "@business/domains/entities/notification/base";
import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";

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
				$set: {
					...simpleNotification,
				},
			},
			{ upsert: true },
		);

		return notification;
	},
	async sendNotification(notification) {
		const simpleNotification = notification.toSimpleObject();

		const user = await mongo.userCollection.findOne(
			{
				id: simpleNotification.userId,
			},
		);

		if (!user) {
			return new RepositoryError(
				"user.notfound",
				{
					id: simpleNotification.userId,
				},
			);
		}

		await match({ notification })
			.with(
				{ notification: P.instanceOf(RegisterNotificationEntity) },
				async() => {
					await EmailProvider.send({
						to: user.email,
						subject: "Register",
						// TODO: add template
						content: "",
						from: envs.NO_REPLY_EMAIL,
					});
				},
			)
			.exhaustive();
	},
};
