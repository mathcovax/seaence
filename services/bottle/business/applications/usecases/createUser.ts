import { type Username, type UserId, type UserEmail, UserEntity, type UserLanguage } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";

interface Input {
	id: UserId;
	username: Username;
	email: UserEmail;
	language: UserLanguage;
}

export class CreateUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public async execute({ id, username, email, language }: Input) {
		const user = UserEntity.create({
			id,
			username,
			email,
			language,
		});

		await this.userRepository.save(user);
	}
}
