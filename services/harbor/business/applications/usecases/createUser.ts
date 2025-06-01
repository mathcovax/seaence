import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { UserEntity, type UserUsername, type UserEmail } from "@business/domains/entities/user";
import { FindUserByEmailUsecase } from "./findUserByEmail";
import { bottleRepository } from "../repositories/bottle";

interface Input {
	email: UserEmail;
	username: UserUsername;
}

export class CreateUserUsecase extends UsecaseHandler.create({
	userRepository,
	bottleRepository,
	findUserByEmail: FindUserByEmailUsecase,
}) {
	public async execute({ email, username }: Input) {
		const findedUser = await this.findUserByEmail({ email });

		if (findedUser) {
			return new UsecaseError(
				"email-already-use",
				{ findedUser },
			);
		}

		const user = await this.userRepository.save(
			UserEntity.create({
				id: this.userRepository.generateUserId(),
				email,
				username,
			}),
		);

		await this.bottleRepository.createRegisterNotification(user);

		return user;
	}
}
