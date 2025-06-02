import { type UserId } from "@business/domains/entities/user";
import { type Int, type PositiveInt, UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";

interface Input {
	userId: UserId;
	page: Int;
	quantityPerPage: PositiveInt;
}

export class FindProcessedNotificationToUserUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public async execute({ userId, page, quantityPerPage }: Input) {
		return this.notificationRepository.findProcessedNotificationToUser(
			userId,
			{
				page,
				quantityPerPage,
			},
		);
	}
}
