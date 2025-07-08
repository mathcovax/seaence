import type { FindHttpClientRoute, TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "@vendors/clients-type/bottle/duplojsTypesCodegen";

export type BottleClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type InputNotificationFindMany = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-find-many"
>["body"];

export type InputFindNotificationSettingToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-reply-to-post-setting-find-one"
>["body"];

export type InputEnableNotificationToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-reply-post-setting-enable"
>["body"];

export type InputDisableNotificationToPost = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-reply-post-setting-disable"
>["body"];

export type InputNotificationCount = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-count"
>["body"];

export type InputNotificatondateFindLast = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-date-find-last"
>["body"];
