import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type DocumentFolderList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/find-many-document-folders">,
	"information",
	"documentFolders.found"
>["body"];

export type DocumentFolderPage = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/document-folder-page">,
	"information",
	"documentFolderPage.found"
>["body"];
