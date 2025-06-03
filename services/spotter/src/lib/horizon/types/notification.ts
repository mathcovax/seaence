import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type NotificationList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/notification-list">,
	"information",
	"notificationList.found"
>["body"];

export type NotificationListPage = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/notification-list-page">,
	"information",
	"notificationListPage.found"
>["body"];
