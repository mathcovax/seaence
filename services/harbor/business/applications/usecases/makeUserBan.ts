import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";

interface Input {
	user: UserEntity;
}

export class MakeUserBanUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute({ user }: Input) {
		return this.userRepository.save(
			user.makeBan(),
		);
	}
}
