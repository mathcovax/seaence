import { UsecaseHandler } from "@vendors/clean";
import { bottleRepository } from "../repositories/bottle";
import { type UserEntity } from "@business/domains/entities/user";

interface Input {
	user: UserEntity;
}

export class CreateRegisterNotificationUsecase extends UsecaseHandler.create({
	bottleRepository,
}) {
	public async execute({ user }: Input) {
		return this.bottleRepository.createRegisterNotification(user);
	}
}
