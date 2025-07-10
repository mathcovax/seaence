import { notificationRepository } from "@business/applications/repositories/notification";
import { BottleAPI } from "@interfaces/providers/bottle";
import { RepositoryError } from "@vendors/clean";

notificationRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async enableReplyPostNotificationToAuthor(post) {
		await BottleAPI.enableReplyPostNotification({
			postId: post.id.value,
			userId: post.authorId.value,
		});
	},
};
