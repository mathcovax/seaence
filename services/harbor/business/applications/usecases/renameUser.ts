import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { type UserEntity, type UserUsername } from "@business/domains/entities/user";

interface Input {
	user: UserEntity;
	newUsername: UserUsername;
}

export class RenameUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute({ user, newUsername }: Input) {
		const renamedUser = user.rename(newUsername);

		return this.userRepository.save(renamedUser);
	}
}
