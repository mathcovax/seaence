import { bottleRepository } from "@business/applications/repositories/bottle";
import { BottleAPI } from "@interfaces/providers/bottle";
import { RepositoryError } from "@vendors/clean";

bottleRepository.default = {
	save() {
		throw new RepositoryError("Unsupport methods");
	},
	async sendInscriptionNotification(user) {
		const { id, email, username } = user.toSimpleObject();
		return BottleAPI.sendRegisterNotification({
			userId: id,
			userEmail: email,
			username,
		});
	},
};
