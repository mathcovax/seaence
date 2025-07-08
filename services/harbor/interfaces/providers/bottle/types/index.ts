import type { FindHttpClientRoute, TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "@vendors/clients-type/bottle/duplojsTypesCodegen";

export type BottleClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type InputCreateUserAnswerBanNotification = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-answer-ban-create"
>["body"];

export type InputCreateUserAnswerWarningNotification = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-answer-warning-create"
>["body"];

export type InputCreateUserPostWarningNotification = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-post-warning-create"
>["body"];

export type InputCreateUserPostBanNotification = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-post-ban-create"
>["body"];
