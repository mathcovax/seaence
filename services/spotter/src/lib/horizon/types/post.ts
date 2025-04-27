import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";
import type { HorizonClientRoute } from "..";

export type PostList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "GET", "/articles/{articleId}/posts">,
	"information",
	"posts.found"
>["body"];

export type Post = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "GET", "/posts/{postId}">,
	"information",
	"post.found"
>["body"];
