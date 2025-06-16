import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type CoralClientRoute } from ".";

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
