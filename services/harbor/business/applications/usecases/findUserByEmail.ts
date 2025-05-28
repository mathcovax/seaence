import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { type UserEmail } from "@business/domains/entities/user";

interface Input {
	email: UserEmail;
}

export class FindUserByEmailUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute({ email }: Input) {
		return this.userRepository.findOneByEmail(email);
	}
}
