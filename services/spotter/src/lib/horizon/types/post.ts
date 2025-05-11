import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type PostList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/post-list">,
	"information",
	"postList.found"
>["body"];

export type PostListPage = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/post-list-page">,
	"information",
	"postListPage.found"
>["body"];

export type PostPage = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/post-page">,
	"information",
	"postPage.found"
>["body"];
