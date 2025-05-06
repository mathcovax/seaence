import { type estypes } from "@elastic/elasticsearch";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { type GenderAggregationsResults, genderAggregationResultsToFacet, buildGenderAggregation } from "./gender";
import { articleTypeAggregationsResultsToFacet, type ArticleTypeFilterValues, buildArticleTypeAggregation, type ArticleTypeAggregationsResults, buildArticleTypeFilter } from "./articleTypes";
import { buildYearAggregation, yearAggregationsResultsToFacet, type YearAggregationsResults } from "./year";
import { buildSpeciesAggregation, speciesAggregationResultsToFacet, type SpeciesAggregationsResults } from "./species";

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

export function buildFacetsAggregations(language: Language) {
	return {
		articleTypeResult: buildArticleTypeAggregation(),
		genderResult: buildGenderAggregation(language),
		...buildYearAggregation(),
		speciesResult: buildSpeciesAggregation(language),
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
) {
	return {
		articleType: articleTypeAggregationsResultsToFacet(articleTypeResult),
		year: yearAggregationsResultsToFacet(journalPublishYearResult, webPublishYearResult),
		gender: genderAggregationResultsToFacet(language, genderResult),
		species: speciesAggregationResultsToFacet(language, speciesResult),
	} satisfies Record<string, Facet<unknown>[]>;
}

export type FiltersValues =
	& ArticleTypeFilterValues;

export function buildFilters(
	filtersValues: FiltersValues,
) {
	return {
		must: [...buildArticleTypeFilter(filtersValues.articleType)],
	} satisfies estypes.QueryDslBoolQuery;
}
