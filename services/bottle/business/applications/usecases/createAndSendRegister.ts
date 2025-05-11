import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";
import { userRepository } from "../repositories/user";
import { UserEntity, type UserEmail, type UserId, type Username } from "@business/domains/entities/user";
import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";

interface Input {
	userId: UserId;
	username: Username;
	userEmail: UserEmail;
}
export class CreateAndSendRegisterUsecase extends UsecaseHandler.create({
	notificationRepository,
	userRepository,
}) {
	public async execute(input: Input) {
		const { userId, username, userEmail } = input;

		const user = UserEntity.create({
			id: userId,
			username,
			email: userEmail,
		});

		const registerNotification = RegisterNotificationEntity.create({
			id: this.notificationRepository.generateNotificationId(),
			userId,
		});

		await Promise.all([
			this.userRepository.save(user),
			this.notificationRepository.save(registerNotification),
		]);

		await this.notificationRepository.sendNotification(registerNotification);

		await this.notificationRepository.save(registerNotification.process());
	}
}
