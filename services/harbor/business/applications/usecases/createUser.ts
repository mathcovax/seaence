import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { userRepository } from "../repositories/user";
import { UserEntity, type UserUsername, type UserEmail, type UserLanguage } from "@business/domains/entities/user";
import { FindUserByEmailUsecase } from "./findUserByEmail";
import { EmailIsLinkToDeletedUserUsecase } from "./emailIsLinkToDeletedUser";

interface Input {
	email: UserEmail;
	username: UserUsername;
	language: UserLanguage;
}

export class CreateUserUsecase extends UsecaseHandler.create({
	userRepository,
	findUserByEmail: FindUserByEmailUsecase,
	emailIsLinkToDeletedUser: EmailIsLinkToDeletedUserUsecase,
}) {
	public async execute({ email, username, language }: Input) {
		const findedUser = await this.findUserByEmail({ email });

		if (findedUser) {
			return new UsecaseError(
				"email-already-use",
				{ findedUser },
			);
		}

		const oldUser = await this.emailIsLinkToDeletedUser({ email });

		if (oldUser) {
			const restoredUser = oldUser.restore({
				email,
				username,
				language,
			});

			return this.userRepository.save(
				restoredUser,
			);
		}

		const newUser = UserEntity.create({
			id: this.userRepository.generateUserId(),
			email,
			username,
			language,
		});

		return this.userRepository.save(
			newUser,
		);
	}
}
