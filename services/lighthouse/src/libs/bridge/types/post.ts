import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";
import type { BridgeClientRoute } from "..";

export type PostModerationPage = FindHttpClientRouteResponse<
	FindHttpClientRoute<BridgeClientRoute, "POST", "/post-moderation-page">,
	"information",
	"postModerationPage.found"
>["body"];
