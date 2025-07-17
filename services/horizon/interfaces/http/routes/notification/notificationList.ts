import { Notification } from "@business/entities/notification";
import { notificationConfig } from "@interfaces/configs/notification";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { BottleAPI } from "@interfaces/providers/bottle";

useMustBeConnectedBuilder()
	.createRoute("POST", "/notification-list")
	.extract({
		body: {
			page: zod.number()
				.min(notificationConfig.findNotifications.pageOffset),
		},
	})
	.handler(
		async(pickup) => {
			const { user, page } = pickup(["user", "page"]);

			const { body: notications } = await BottleAPI.findNotifications({
				userId: user.id,
				quantityPerPage: notificationConfig.findNotifications.quantityPerPage,
				page: page - notificationConfig.findNotifications.pageOffset,
			});

			return new OkHttpResponse(
				"notificationList.found",
				notications,
			);
		},
		makeResponseContract(OkHttpResponse, "notificationList.found", Notification.index.array()),
	);
