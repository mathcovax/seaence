import { notificationRepository } from "@business/applications/repositories/notification";
import { BottleAPI } from "@interfaces/providers/bottle";
import { RepositoryError } from "@vendors/clean";

notificationRepository.default = {
	save() {
		throw new RepositoryError("Unsupported method");
	},
	createUserPostBanNotification(params) {
		const { postId, reason, user, warningId } = params;

		return BottleAPI.createUserPostBanNotification({
			postId: postId.value,
			reason: reason.value,
			userId: user.id.value,
			warningId: warningId.value,
		});
	},
	createUserPostWarningNotification(params) {
		const { postId, reason, user, warningId } = params;

		return BottleAPI.createUserPostWarningNotification({
			postId: postId.value,
			reason: reason.value,
			userId: user.id.value,
			warningId: warningId.value,
		});
	},
	createUserAnswerBanNotification(params) {
		const { postId, answerId, reason, user, warningId } = params;

		return BottleAPI.createUserAnswerBanNotification({
			postId: postId.value,
			answerId: answerId.value,
			reason: reason.value,
			userId: user.id.value,
			warningId: warningId.value,
		});
	},
	createUserAnswerWarningNotification(params) {
		const { postId, answerId, reason, user, warningId } = params;

		return BottleAPI.createUserAnswerWarningNotification({
			postId: postId.value,
			answerId: answerId.value,
			reason: reason.value,
			userId: user.id.value,
			warningId: warningId.value,
		});
	},
};
