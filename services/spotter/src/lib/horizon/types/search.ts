import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";
import type { HorizonClientRoute } from "..";
import { createEnum } from "@vendors/clean";
import type { GenderFacetValue, SpeciesFacetValue } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import type { UnionToTuple } from "@duplojs/utils";

export type SearchParams = FindHttpClientRoute<
	HorizonClientRoute,
	"POST",
	"/search-results"
>["body"];

export type SearchDetailsBody = FindHttpClientRoute<
	HorizonClientRoute,
	"POST",
	"/search-details"
>["body"];

export const genderFacetValueEnum = createEnum<
	GenderFacetValue,
	UnionToTuple<GenderFacetValue>
>([
	"male",
	"female",
]);

export const genderFacetValueSchema = zod.enum(
	genderFacetValueEnum.toTuple(),
);

export const speciesFacetValueEnum = createEnum<
	SpeciesFacetValue,
	UnionToTuple<SpeciesFacetValue>
>([
	"human",
	"otherAnimal",
]);

export const speciesFacetValueSchema = zod.enum(
	speciesFacetValueEnum.toTuple(),
);

export type SearchDetails = FindHttpClientRouteResponse<
	FindHttpClientRoute<
		HorizonClientRoute,
		"POST",
		"/search-details"
	>,
	"information",
	"search.details"
>["body"];
