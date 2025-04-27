import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";
import type { HorizonClientRoute } from "..";

export type Answer = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "GET", "/posts/{postId}/answers">,
	"information",
	"answers.found"
>["body"][number];
