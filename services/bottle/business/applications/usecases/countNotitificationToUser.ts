import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";

interface Input {
	user: UserEntity;
}

export class CountNotificationToUserUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public async execute({ user }: Input) {
		return this.notificationRepository.countNotificationToUser(
			user,
		);
	}
}
