import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type User = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "GET", "/user">,
	"information",
	"user.get"
>["body"];
