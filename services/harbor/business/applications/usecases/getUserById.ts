import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { type UserId } from "@business/domains/entities/user";

interface Input {
	id: UserId;
}

export class GetUserByIdUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public async execute({ id }: Input) {
		return this.userRepository.findOneById(id);
	}
}
