import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type SeaClientRoute } from "..";

export type SearchResultBody = FindHttpClientRoute<
	SeaClientRoute,
	"POST",
	"/search-results"
>["body"];
