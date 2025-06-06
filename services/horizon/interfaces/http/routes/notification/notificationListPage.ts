import { notificationConfig } from "@interfaces/configs/notification";
import { endpointNotificationListPageSchema } from "@interfaces/http/schemas/notification";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { BottleAPI } from "@interfaces/providers/bottle";

useMustBeConnectedBuilder()
	.createRoute("POST", "/notification-list-page")
	.handler(
		async(pickup) => {
			const { user } = pickup(["user"]);

			const { body: { count } } = await BottleAPI.countNotifications(
				{
					userId: user.id,
				},
			);

			return new OkHttpResponse(
				"notificationListPage.found",
				{
					totalNoticationCount: count,
					quantityNotificationPerPage: notificationConfig.findNotifications.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "notificationListPage.found", endpointNotificationListPageSchema),
	);

