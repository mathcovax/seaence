import type { FindHttpClientRoute } from "@duplojs/http-client";
import type { HorizonClientRoute } from "..";

export type SimpleSearchResultBody = FindHttpClientRoute<
	HorizonClientRoute,
	"POST",
	"/simple-search-results"
>["body"];

export type SearchDetailsBody = FindHttpClientRoute<
	HorizonClientRoute,
	"POST",
	"/search-details"
>["body"];
