import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type SchoolClientRoute } from ".";

export type InputCreatePost = FindHttpClientRoute<
	SchoolClientRoute,
	"POST",
	"/posts"
>["body"];

export type InputCreateAnswer = FindHttpClientRoute<
	SchoolClientRoute,
	"POST",
	"/posts/{postId}/answers"
>["body"];
