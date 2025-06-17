import { type TransformCodegenRouteToHttpClientRoute, type FindHttpClientRoute } from "@duplojs/http-client";
import { type CodegenRoutes } from "@vendors/clients-type/coral/duplojsTypesCodegen";

export type CoralClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type InputFindManyFavoritEquationName = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-many-favorite-equation-name"
>["body"];

export type InputFindManyFavoritEquationDetails = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-many-favorite-equation-details"
>["body"];

export type InputFindOneFavoritEquation = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-one-favorite-equation"
>["body"];

export type InputUpsertFavoritEquation = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/upsert-favorite-equation"
>["body"];

export type InputRemoveFavoritEquation = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/remove-favorite-equation"
>["body"];

export type InputCreateDocumentFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/create-document-folder"
>["body"];

export type InputFindManyDocumentFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/search-document-folders"
>["body"];

export type InputGetfindManyDocumentFolderCount = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/get-search-document-folders-count"
>["body"];

export type InputRemoveDocumentFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/remove-document-folder"
>["body"];

export type InputFindOneDocumentFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/get-document-folder"
>["body"];

export type InputFindManyDocumentInFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/search-documents-in-folder"
>["body"];

export type InputGetfindManyDocumentInFolderCount = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/get-search-documents-in-folder-count"
>["body"];

export type InputRemoveDocumentInFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/remove-document-in-folder"
>["body"];
