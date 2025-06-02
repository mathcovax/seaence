import { bottleRepository } from "@business/applications/repositories/bottle";
import { BottleAPI } from "@interfaces/providers/bottle";
import { RepositoryError } from "@vendors/clean";

bottleRepository.default = {
	save() {
		throw new RepositoryError("Unsupported methods");
	},
	async createRegisterNotification(user) {
		await BottleAPI.createRegisterNotification(user.id.value);
	},
};
