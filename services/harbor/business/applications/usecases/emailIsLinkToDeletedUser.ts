import { type UserEmail } from "@business/domains/entities/user";
import { UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";

interface Input {
	email: UserEmail;
}

export class EmailIsLinkToDeletedUserUsecase extends UsecaseHandler.create({
	userRepository,
}) {
	public execute({ email }: Input) {
		return this.userRepository.findOneByDeleteId(
			this.userRepository.generateDeleteId(email),
		);
	}
}
