import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type User = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/me">,
	"information",
	"me.info.get"
>["body"];
