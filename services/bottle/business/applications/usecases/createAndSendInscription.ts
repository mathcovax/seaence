import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";
import { userRepository } from "../repositories/user";
import { UserEntity, type UserEmail, type UserId, type Username } from "@business/domains/entities/user";
import { InscriptionNotificationEntity } from "@business/domains/entities/notification/email";

interface Input {
	userId: UserId;
	username: Username;
	userEmail: UserEmail;
}
export class CreateAndSendInscriptionUsecase extends UsecaseHandler.create({
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
		await this.userRepository.save(user);

		const inscriptionNotification = InscriptionNotificationEntity.create({
			id: this.notificationRepository.generateNotificationId(),
			userId,
		});
		await this.notificationRepository.save(inscriptionNotification);

		await this.notificationRepository.sendNotificationToEmail(inscriptionNotification);

		await this.notificationRepository.save(inscriptionNotification.process());
	}
}
