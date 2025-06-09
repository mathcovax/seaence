import { notificationRepository } from "@business/applications/repositories/notification";
import { BottleAPI } from "@interfaces/providers/bottle";
import { RepositoryError } from "@vendors/clean";

notificationRepository.default = {
	save() {
		throw new RepositoryError("Unsupported method");
	},
	createUserPostBanNotification(params) {
		return BottleAPI.createUserPostBanNotification({
			postId: params.postId.value,
			reason: params.reason.value,
			userId: params.user.id.value,
			warningId: params.warningId.value,
		});
	},
	createUserPostWarningNotification(params) {
		return BottleAPI.createUserPostWarningNotification({
			postId: params.postId.value,
			reason: params.reason.value,
			userId: params.user.id.value,
			warningId: params.warningId.value,
		});
	},
};
