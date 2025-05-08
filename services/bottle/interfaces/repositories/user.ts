import { userRepository } from "@business/applications/repositories/user";
import { mongo } from "@interfaces/providers/mongo";

userRepository.default = {
	async save(user) {
		const simpleUser = user.toSimpleObject();

		await mongo.userCollection.updateOne(
			{
				id: simpleUser.id,
			},
			{
				$set: {
					...simpleUser,
				},
			},
			{ upsert: true },
		);

		return user;
	},
};
