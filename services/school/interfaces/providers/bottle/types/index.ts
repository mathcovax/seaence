import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type BottleClientRoute } from "..";

export type InputEnableNotification = FindHttpClientRoute<
	BottleClientRoute,
	"POST",
	"/notification-reply-post-setting-enable"
>["body"];
