import { notificationRepository } from "@business/applications/repositories/notification";
import { BottleAPI } from "@interfaces/providers/bottle";
import { RepositoryError } from "@vendors/clean";

notificationRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async enableNotification(post, user) {
		await BottleAPI.enableNotification({
			postId: post.id.value,
			userId: user.id.value,
		});
	},
};
