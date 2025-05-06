import { type ExpectType } from "@duplojs/utils";
import { type estypes } from "@elastic/elasticsearch";
import { type FacetWrapperSchema } from "@interfaces/http/schemas/facet";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { type GenderAggregationsResults, genderAggregationResultsToFacet, getGenderAggregation } from "./gender";
import { articleTypeAggregationsResultsToFacet, getArticleTypeAggregation, type ArticleTypeAggregationsResults } from "./articleTypes";
import { getYearAggregation, yearAggregationsResultsToFacet, type YearAggregationsResults } from "./year";
import { getSpeciesAggregation, speciesAggregationResultsToFacet, type SpeciesAggregationsResults } from "./species";

export interface AggregationResult<
	GenericKey extends unknown = unknown,
> {
	buckets: {
		key: GenericKey;
		doc_count: number;
	}[];
}

export interface Facet<
	GenericValue extends unknown = unknown,
> {
	value: GenericValue;
	quantity: number;
}

export type AggregationsResults =
	& YearAggregationsResults
	& GenderAggregationsResults
	& ArticleTypeAggregationsResults
	& SpeciesAggregationsResults;

export function getFacetsAggregations(language: Language) {
	return {
		articleTypeResult: getArticleTypeAggregation(),
		genderResult: getGenderAggregation(language),
		...getYearAggregation(),
		speciesResult: getSpeciesAggregation(language),
	} satisfies Record<keyof AggregationsResults, estypes.AggregationsAggregationContainer>;
}

export function aggregationsResultsToFacetWrapper(
	language: Language,
	{
		articleTypeResult,
		journalPublishYearResult,
		webPublishYearResult,
		genderResult,
		speciesResult,
	}: AggregationsResults,
): FacetWrapperSchema {
	return {
		articleType: articleTypeAggregationsResultsToFacet(articleTypeResult),
		year: yearAggregationsResultsToFacet(journalPublishYearResult, webPublishYearResult),
		gender: genderAggregationResultsToFacet(language, genderResult),
		species: speciesAggregationResultsToFacet(language, speciesResult),
	};
}
