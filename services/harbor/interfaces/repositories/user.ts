import { userRepository } from "@business/applications/repositories/user";
import { UserEntity, userIdObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
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
	async save(entity) {
		const simpleEntity = entity.toSimpleObject();

		const prismaUser = await prismaClient.user.findFirst({
			where: {
				id: simpleEntity.id,
			},
		});

		if (prismaUser) {
			if (prismaUser.username !== simpleEntity.username) {
				await asyncMessage.collections.renameUser.emit({
					userId: simpleEntity.id,
					newName: simpleEntity.username,
					oldName: prismaUser.username,
				});
			}

			await prismaClient.user.update({
				where: {
					id: simpleEntity.id,
				},
				data: simpleEntity,
			});
		} else {
			await prismaClient.user.create({
				data: simpleEntity,
			});
		}

		return entity;
	},
};
