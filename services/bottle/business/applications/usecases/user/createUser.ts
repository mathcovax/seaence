import { type Username, type UserId, type UserEmail, UserEntity, type UserLanguage } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "@business/applications/repositories/user";
import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { notificationRepository } from "@business/applications/repositories/notification";
import { userObjecter } from "@business/domains/common/user";

interface Input {
	id: UserId;
	username: Username;
	email: UserEmail;
	language: UserLanguage;
}

export class CreateUserUsecase extends UsecaseHandler.create({
	userRepository,
	notificationRepository,
}) {
	public async execute({ id, username, email, language }: Input) {
		const user = UserEntity.create({
			id,
			username,
			email,
			language,
		});

		await this.userRepository.save(user);

		const registerNotification = RegisterNotificationEntity.create({
			id: this.notificationRepository.generateNotificationId(),
			user: userObjecter.unsafeCreate(user),
		});

		await this.notificationRepository.save(registerNotification);

		await this.notificationRepository.sendNotification(registerNotification);

		await this.notificationRepository.save(registerNotification.process());

		return user;
	}
}
