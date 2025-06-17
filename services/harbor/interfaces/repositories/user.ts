/* eslint-disable camelcase */
import { userRepository } from "@business/applications/repositories/user";
import { UserEntity, userIdObjecter, type UserLanguage, userLanguageEnum } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler } from "@vendors/clean";
import { uuidv7 } from "uuidv7";
import { type $Enums } from "@prisma/output";

const userLanguageMapper: Record<$Enums.UserLanguage, UserLanguage["value"]> = {
	en_US: userLanguageEnum["en-US"],
	fr_FR: userLanguageEnum["fr-FR"],
};

const userLanguageReverseMapper = Object.fromEntries(
	Object
		.entries(userLanguageMapper)
		.map(([key, value]) => [value, key] as const),
) as Record<UserLanguage["value"], $Enums.UserLanguage>;

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
				language: userLanguageMapper[user.language],
			},
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
			{
				...user,
				language: userLanguageMapper[user.language],
			},
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
				await asyncMessage.collections.updateUser.emit({
					...simpleEntity,
					updatedFields: ["username"],
				});
			}

			await prismaClient.user.update({
				where: {
					id: simpleEntity.id,
				},
				data: {
					...simpleEntity,
					language: userLanguageReverseMapper[simpleEntity.language],
				},
			});
		} else {
			await asyncMessage.collections.createUser.emit({
				userId: simpleEntity.id,
				email: simpleEntity.email,
				username: simpleEntity.username,
				language: simpleEntity.language,
			});

			await prismaClient.user.create({
				data: {
					...simpleEntity,
					language: userLanguageReverseMapper[simpleEntity.language],
				},
			});
		}

		return entity;
	},
};
