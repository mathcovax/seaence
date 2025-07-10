import { type UserEmail, type UserEntity, type UserLanguage, type Username } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../../repositories/user";

interface Input {
	user: UserEntity;
	email: UserEmail;
	username: Username;
	language: UserLanguage;
}

export class UpdateUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute(
		{
			user,
			email,
			username,
			language,
		}: Input,
	) {
		const updatedUser = user.updateValues({
			email,
			username,
			language,
		});

		return this.userRepository.save(updatedUser);
	}
}
