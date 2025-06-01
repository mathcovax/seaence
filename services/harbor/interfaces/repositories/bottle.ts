import { bottleRepository } from "@business/applications/repositories/bottle";
import { BottleAPI } from "@interfaces/providers/bottle";
import { RepositoryError } from "@vendors/clean";

bottleRepository.default = {
	save() {
		throw new RepositoryError("Unsupported methods");
	},
	async createRegisterNotification(user) {
		const { id, email, username } = user.toSimpleObject();

		await BottleAPI.createRegisterNotification({
			id,
			email,
			username,
			language: "fr-FR",
		});
	},
};
