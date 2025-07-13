/* eslint-disable camelcase */
import { userRepository } from "@business/applications/repositories/user";
import { userDeleteIdObjecter, UserEntity, userIdObjecter, type UserLanguage, userLanguageEnum } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler } from "@vendors/clean";
import { uuidv7 } from "uuidv7";
import { type $Enums } from "@prisma/output";
import { createHmac } from "crypto";
import { envs } from "@interfaces/envs";

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
			if (
				simpleEntity.deleteId
				&& prismaUser.deleteId === null
			) {
				await asyncMessage.collections.deleteUser.emit({
					userId: simpleEntity.id,
				});
			} else if (
				simpleEntity.deleteId === null
				&& prismaUser.deleteId
			) {
				await asyncMessage.collections.restoreUser.emit({
					userId: simpleEntity.id,
					email: simpleEntity.email,
					username: simpleEntity.username,
					language: simpleEntity.language,
				});
			} else if (
				simpleEntity.username !== prismaUser.username
				|| simpleEntity.language !== userLanguageMapper[prismaUser.language]
			) {
				await asyncMessage.collections.updateUser.emit({
					userId: simpleEntity.id,
					username: simpleEntity.username !== prismaUser.username
						? simpleEntity.username
						: undefined,
					language: simpleEntity.language !== userLanguageMapper[prismaUser.language]
						? simpleEntity.language
						: undefined,
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
	generateDeleteId(email) {
		const hash = createHmac(
			"SHA512",
			envs.USER_DELETE_ID_KEY,
		)
			.update(email.value)
			.digest("hex");

		return userDeleteIdObjecter.unsafeCreate(hash);
	},
	findOneByDeleteId(deleteId) {
		return prismaClient
			.user
			.findFirst({
				where: {
					deleteId: deleteId.value,
				},
			})
			.then(
				(prismaUser) => prismaUser && EntityHandler.unsafeMapper(
					UserEntity,
					{
						...prismaUser,
						language: userLanguageMapper[prismaUser.language],
					},
				),
			);
	},
};
