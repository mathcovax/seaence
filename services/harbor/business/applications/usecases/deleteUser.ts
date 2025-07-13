import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { type UserEntity } from "@business/domains/entities/user";

interface Input {
	user: UserEntity;
}

export class DeleteUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute({ user }: Input) {
		if (user.deleteId) {
			return new UsecaseError("user-already-delete", { user });
		}

		const deleteId = this.userRepository.generateDeleteId(user.email);
		const deletedUser = user.delete(deleteId);

		return this.userRepository.save(deletedUser);
	}
}
