import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type NotificationList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/notification-list">,
	"information",
	"notificationList.found"
>["body"];

export type Notification = NotificationList[number];

export type RegisterNotification = Extract<
	Notification,
	{ type: "registerNotificationType" }
>;

export type ReplyToPostNotification = Extract<
	Notification,
	{ type: "replyToPostNotificationType" }
>;

export type NotificationListPage = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/notification-list-page">,
	"information",
	"notificationListPage.found"
>["body"];
