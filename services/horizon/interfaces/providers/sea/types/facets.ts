import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type SeaClientRoute } from "..";

export type FacetBody = FindHttpClientRoute<
	SeaClientRoute,
	"POST",
	"/facets"
>["body"];
