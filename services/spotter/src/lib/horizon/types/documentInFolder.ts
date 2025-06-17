import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type DocumentInFolderPage = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/document-in-folder-page">,
	"information",
	"documentInFolderPage.found"
>["body"];

export type DocumentInFolderList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/find-many-document-in-folder">,
	"information",
	"documentInFolderList.found"
>["body"];
