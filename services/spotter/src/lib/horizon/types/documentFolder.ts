import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type DocumentFolderList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/find-many-document-folder">,
	"information",
	"documentFolders.found"
>["body"];

export type DocumentFolderListDetails = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/find-many-document-folder-details">,
	"information",
	"documentFolders.foundDetails"
>["body"];

export type DocumentFolderPage = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/document-folder-page">,
	"information",
	"documentFolderPage.found"
>["body"];

export type DocumentFolderInWhichDocumentExistList = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/find-many-document-folders-in-which-document-exist">,
	"information",
	"documentFolders.found"
>["body"];

export type DocumentFolderInWhichDocumentExistListDetails = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/find-many-document-folders-in-which-document-exist-details">,
	"information",
	"documentFolders.foundDetails"
>["body"];

export type DocumentFolderDialog = FindHttpClientRouteResponse<
	FindHttpClientRoute<HorizonClientRoute, "POST", "/document-folder-dialog">,
	"information",
	"documentFolderDialog.found"
>["body"];
