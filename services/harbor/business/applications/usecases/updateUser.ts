import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { type UserEntity, type UserUsername } from "@business/domains/entities/user";

interface Input {
	user: UserEntity;
	username?: UserUsername;
}

export class UpdateUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute({ user, username }: Input) {
		if (!user.updateDelayIsRespected()) {
			return new UsecaseError("update-delay-is-not-respected");
		}

		const updatedUser = user.updateProps({ username });

		return this.userRepository.save(updatedUser);
	}
}
