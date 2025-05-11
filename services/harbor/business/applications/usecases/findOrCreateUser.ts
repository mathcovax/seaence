import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { UserEntity, type UserEmail } from "@business/domains/entities/user";
import { CreateRegisterNotificationUsecase } from "./createRegisterNotification";

interface Input {
	email: UserEmail;
}

export class FindOrCreateUserUsecase extends UsecaseHandler.create({
	userRepository,
	createRegisterNotification: CreateRegisterNotificationUsecase,
}) {
	public async execute({ email }: Input) {
		let user = await this.userRepository.findOneByEmail(email);

		if (!user) {
			user = await this.userRepository.save(
				UserEntity.create({
					id: this.userRepository.generateUserId(),
					email,
				}),
			);
			await this.createRegisterNotification({ user });
		}

		return user;
	}
}
