import { notificationConfig } from "@interfaces/configs/notification";
import { endpointNotificationListSchema } from "@interfaces/http/schemas/notification";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { BottleAPI } from "@interfaces/providers/bottle";

useMustBeConnectedBuilder()
	.createRoute("POST", "/notification-list")
	.extract({
		body: {
			page: zod.number(),
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

			return new OkHttpResponse("notificationList.found", notications);
		},
		makeResponseContract(OkHttpResponse, "notificationList.found", endpointNotificationListSchema),
	);
