import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";
import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { type UserId } from "@business/domains/entities/user";
import { userRepository } from "../repositories/user";

interface Input {
	userId: UserId;
}

export class CreateAndSendRegisterNotificationUsecase extends UsecaseHandler.create({
	notificationRepository,
	userRepository,
}) {
	public async execute({ userId }: Input) {
		const user = await this.userRepository.findUserById(userId);

		if (!user) {
			return new UsecaseError("user-not-exist");
		}

		const registerNotification = RegisterNotificationEntity.create({
			id: this.notificationRepository.generateNotificationId(),
			userId,
		});

		await this.notificationRepository.save(registerNotification);

		await this.notificationRepository.sendNotification(registerNotification, user);

		return this.notificationRepository.save(registerNotification.process());
	}
}
