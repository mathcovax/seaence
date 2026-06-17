import { NotificationSettingPort } from "@applications/ports/notificationSetting";
import { unwrap } from "@duplojs/utils";
import { BottleAPI } from "../../providers/bottle";

export const notificationSettingPort = NotificationSettingPort.createImplementation({
	async save(entity) {
		await BottleAPI.enableReplyPostNotification({
			postId: unwrap(entity.postId),
			userId: unwrap(entity.userId),
		});

		return entity;
	},
});
