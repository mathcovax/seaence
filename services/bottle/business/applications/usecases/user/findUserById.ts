import { type UserId } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../../repositories/user";

interface Input {
	userId: UserId;
}

export class FindOneUserByIdUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute({ userId }: Input) {
		return this.userRepository.findOneUserById(userId);
	}
}
