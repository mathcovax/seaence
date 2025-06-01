import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";
import { type User } from "@business/domains/common/user";
import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";

interface Input {
	user: User;
}

export class CreateAndSendRegisterNotificationUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public async execute({ user }: Input) {
		const registerNotification = RegisterNotificationEntity.create({
			id: this.notificationRepository.generateNotificationId(),
			user,
		});

		await this.notificationRepository.save(registerNotification);

		await this.notificationRepository.sendNotification(registerNotification);

		await this.notificationRepository.save(registerNotification.process());
	}
}
