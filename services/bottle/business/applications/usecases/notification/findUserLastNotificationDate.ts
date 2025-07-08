import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../../repositories/notification";

interface Input {
	user: UserEntity;
}

export class FindUserLastNotificationDateUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public execute({ user }: Input) {
		return this.notificationRepository.findLastNotificationDateToUser(user);
	}
}
