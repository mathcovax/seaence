import { type UserEntity } from "@business/domains/entities/user";
import { type Int, type PositiveInt, UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";

interface Input {
	user: UserEntity;
	page: Int;
	quantityPerPage: PositiveInt;
}

export class FindManyNotificationToUserUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public async execute({ user, page, quantityPerPage }: Input) {
		return this.notificationRepository.findManyNotificationToUser(
			user,
			{
				page,
				quantityPerPage,
			},
		);
	}
}
