import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type SeaClientRoute } from "..";

export type SimpleSearchResultBody = FindHttpClientRoute<
	SeaClientRoute,
	"POST",
	"/simple-search-results"
>["body"];
