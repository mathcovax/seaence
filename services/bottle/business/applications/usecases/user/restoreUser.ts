import { userRepository } from "@business/applications/repositories/user";
import { type UserEmail, type UserLanguage, type Username, type UserEntity } from "@business/domains/entities/user";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	user: UserEntity;
	username: Username;
	email: UserEmail;
	language: UserLanguage;
}

export class RestoreUserUsecase extends UsecaseHandler.create({
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
		if (user.anonymized.value !== true) {
			return new UsecaseError("user-not-anonymized", { user });
		}

		const restoredUser = user.restore({
			email,
			username,
			language,
		});

		return this.userRepository.save(restoredUser);
	}
}
