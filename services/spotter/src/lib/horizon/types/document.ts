import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";
import type { UnionToTuple } from "@duplojs/utils";

export type DocumentLanguage = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/post-list-page">,
	"information",
	"postListPage.found"
>["body"]["document"]["language"];

export type DocumentId = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/post-list-page">,
	"information",
	"postListPage.found"
>["body"]["document"]["id"];

export const documentLanguageSchema = zod.enum(["fr-FR", "en-US"] satisfies UnionToTuple<DocumentLanguage>);
