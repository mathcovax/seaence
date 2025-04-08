import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { type UserEmail, UserEntity, type UserUsername } from "@business/domains/entities/user";

interface Input {
	email: UserEmail;
	username: UserUsername;
}

export class CreateUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public async execute({ email, username }: Input) {
		return this.userRepository.save(
			UserEntity.create({
				id: this.userRepository.generateUserId(),
				email,
				username,
			}),
		);
	}
}
