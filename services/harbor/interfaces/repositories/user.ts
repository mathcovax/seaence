import { userRepository } from "@business/applications/repositories/user";
import { UserEntity, userIdObjecter, userUsernameObjecter } from "@business/domains/entities/user";
import { prismaClient } from "@interfaces/providers/prisma";
import { uuidv7 } from "uuidv7";

userRepository.default = {
	generateUserId: () => userIdObjecter.unsafeCreate(uuidv7()),
	findOneByEmail: async(email) => {
		const user = await prismaClient.user.findFirst({
			where: {
				email: email.value,
			},
		});

		if (!user) {
			return null;
		}

		return UserEntity.create({
			id: userIdObjecter.unsafeCreate(user.id),
			email,
			username: userUsernameObjecter.unsafeCreate(user.username),
		});
	},
	save: async(user) => {
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
