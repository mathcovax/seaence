import { horizonClient } from "@/lib/horizon";
import type { NotificationList, NotificationListPage } from "@/lib/horizon/types/notification";

export function useNotificationListPage(
	whenFindError: () => void,
) {
	const notificationListPageInformation = ref<NotificationListPage | null>(null);
	const notificationList = ref<NotificationList | null>(null);

	const defaultPageOfNotificationList = 1;
	const pageOfNotificationList = ref(defaultPageOfNotificationList);

	function findNotificationList() {
		return horizonClient
			.post(
				"/notification-list",
				{
					body: {
						page: pageOfNotificationList.value,
					},
					disableAuthenticationRequiredManagement: true,
				},
			)
			.whenInformation(
				"notificationList.found",
				({ body }) => {
					notificationList.value = body;
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	void horizonClient
		.post("/notification-list-page")
		.whenInformation(
			"notificationListPage.found",
			({ body }) => {
				notificationListPageInformation.value = body;
			},
		)
		.whenRequestError(
			whenFindError,
		);

	function setPageOfNotificaitonList(page: number) {
		pageOfNotificationList.value = page;
	}

	watch(
		pageOfNotificationList,
		findNotificationList,
	);

	return {
		notificationList,
		notificationListPageInformation,
		pageOfNotificationList,
		setPageOfNotificaitonList,
	};
}
