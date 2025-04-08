import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { type UserEmail, UserEntity } from "@business/domains/entities/user";

interface Input {
	email: UserEmail;
}

export class CreateUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public async execute({ email }: Input) {
		return this.userRepository.save(
			UserEntity.create({
				id: this.userRepository.generateUserId(),
				email,
			}),
		);
	}
}
