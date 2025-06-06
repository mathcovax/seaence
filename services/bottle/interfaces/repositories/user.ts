import { userRepository } from "@business/applications/repositories/user";
import { UserEntity } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";

userRepository.default = {
	async save(userEntity) {
		const simpleUser = userEntity.toSimpleObject();

		await mongo.userCollection.updateOne(
			{
				id: simpleUser.id,
			},
			{
				$set: simpleUser,
			},
			{ upsert: true },
		);

		return userEntity;
	},
	async findOneUserById(userId) {
		const mongoUser = await mongo.userCollection.findOne(
			{
				id: userId.value,
			},
		);

		if (!mongoUser) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			UserEntity,
			mongoUser,
		);
	},
};
