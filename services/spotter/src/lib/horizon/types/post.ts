import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";
import type { HorizonClientRoute } from "..";

export type PostsPayload = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "GET", "/documents/{documentId}/posts">,
	"information",
	"posts.found"
>["body"];

export type Post = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "GET", "/posts/{postId}">,
	"information",
	"post.found"
>["body"];

export type Language = FindHttpClientRoute<HorizonClientRoute, "GET", "/posts/{postId}">["query"]["language"];
