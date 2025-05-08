import { userRepository } from "@business/applications/repositories/user";
import { UserEntity, userIdObjecter } from "@business/domains/entities/user";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler, RepositoryError } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

userRepository.default = {
	save() {
		throw new RepositoryError("Unsupport methods");
	},
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
			user,
		);
	},
	async findOneById(id) {
		const user = await prismaClient.user.findFirst({
			where: {
				id: id.value,
			},
		});

		if (!user) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			UserEntity,
			user,
		);
	},
	async create(user) {
		const simpleEntity = user.toSimpleObject();
		await prismaClient.user.create({
			data: simpleEntity,
		});

		return user;
	},
	async update(user) {
		const simpleEntity = user.toSimpleObject();
		await prismaClient.user.update({
			where: {
				id: simpleEntity.id,
			},
			data: simpleEntity,
		});
		return user;
	},
};
