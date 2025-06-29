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
	"/find-many-document-folder"
>["body"];

export type InputfindManyDocumentFolderDetails = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-many-document-folders-details"
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
	"/find-many-document-in-folder"
>["body"];

export type InputFindManyDocumentInFolderDetails = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-many-document-in-folder-details"
>["body"];

export type InputRemoveDocumentInFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/remove-document-in-folder"
>["body"];

export type InputCreateManyDocumentInFolder = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/create-many-document-in-folder"
>["body"];

export type InputFindManyDocumentFoldersInWichDocumentExist = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-many-document-folders-in-which-document-exist"
>["body"];

export type InputFindManyDocumentFoldersInWichDocumentExistDetails = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-many-document-folders-in-which-document-exist-details"
>["body"];
