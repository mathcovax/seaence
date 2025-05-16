import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type User = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/user">,
	"information",
	"user.self"
>["body"];
