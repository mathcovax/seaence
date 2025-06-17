import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { type UserLanguage, type UserEntity, type UserUsername } from "@business/domains/entities/user";

interface Input {
	user: UserEntity;
	username?: UserUsername;
	language?: UserLanguage;

}

export class UpdateUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute({ user, username, language }: Input) {
		if (!user.updateDelayIsRespected()) {
			return new UsecaseError("update-delay-is-not-respected");
		}

		const updatedUser = user.updateProps({
			username,
			language,
		});

		return this.userRepository.save(updatedUser);
	}
}
