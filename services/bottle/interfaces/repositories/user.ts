import { userRepository } from "@business/applications/repositories/user";
import { mongo } from "@interfaces/providers/mongo";

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
};
