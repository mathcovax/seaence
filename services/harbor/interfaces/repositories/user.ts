import { userRepository } from "@business/applications/repositories/user";
import { UserEntity, userIdObjecter } from "@business/domains/entities/user";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

userRepository.default = {
	generateUserId() {
		return userIdObjecter.unsafeCreate(uuidv7());
	},
	async findOneByEmail(email) {
		const user = await prismaClient.user.findFirst({
			where: {
				email: email.value,
			},
		});

		if (!user) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			UserEntity,
			{
				...user,
			},
		);
	},
	async save(user) {
		await prismaClient.user.create({
			data: {
				id: user.id.value,
				email: user.email.value,
				username: user.username.value,
			},
		});

		return user;
	},
};
