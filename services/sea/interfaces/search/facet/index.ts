import { type estypes } from "@elastic/elasticsearch";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { type GenderAggregationsResults, genderAggregationResultsToFacet, buildGenderAggregation, type GenderFacet, type GenderFilterValues, buildGenderFilter } from "./gender";
import { articleTypeAggregationsResultsToFacet, type ArticleTypeFilterValues, buildArticleTypeAggregation, type ArticleTypeAggregationsResults, buildArticleTypeFilter, type ArticleTypeFacet } from "./articleTypes";
import { buildYearAggregation, yearAggregationsResultsToFacet, type YearFacet, type YearAggregationsResults, type YearFilterValues, buildYearFilter } from "./year";
import { buildSpeciesAggregation, speciesAggregationResultsToFacet, type SpeciesFacet, type SpeciesAggregationsResults, buildSpeciesFilter, type SpeciesFilterValues } from "./species";
import { elastic } from "@interfaces/providers/elastic";
import { match, P } from "ts-pattern";
import { buildSimpleSearchQuery } from "../simple";

interface FacetResponse {
	hits: {
		total: {
			value: number;
		};
	};
	aggregations: AggregationsResults;
}

export interface AggregationResult<
	GenericKey extends unknown = unknown,
> {
	buckets: {
		key: GenericKey;
		doc_count: number;
	}[];
}

export interface FacetValue<
	GenericValue extends unknown = unknown,
> {
	value: GenericValue;
	quantity: number;
}

export interface Facet<
	GenericName extends string,
	GenericFacetValue extends FacetValue,
> {
	name: GenericName;
	values: GenericFacetValue[];
}

export type Facets = (
	| ArticleTypeFacet
	| YearFacet
	| GenderFacet
	| SpeciesFacet
)[];

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
): Facets {
	const facets: Facets = [yearAggregationsResultsToFacet(journalPublishYearResult, webPublishYearResult)];

	const articleTypeFacet = articleTypeAggregationsResultsToFacet(articleTypeResult);

	if (articleTypeFacet) {
		facets.push(articleTypeFacet);
	}

	const genderFacet = genderAggregationResultsToFacet(language, genderResult);

	if (genderFacet) {
		facets.push(genderFacet);
	}

	const speciesFacet = speciesAggregationResultsToFacet(language, speciesResult);

	if (speciesFacet) {
		facets.push(speciesFacet);
	}

	return facets;
}

export type FiltersValues =
	& ArticleTypeFilterValues
	& GenderFilterValues
	& SpeciesFilterValues
	& YearFilterValues;

export function buildFilters(
	language: Language,
	filtersValues: FiltersValues,
) {
	return {
		must: [
			...buildArticleTypeFilter(filtersValues.articleType),
			...buildGenderFilter(language, filtersValues.gender),
			...buildSpeciesFilter(language, filtersValues.species),
			...buildYearFilter(filtersValues.year),
		],
	} satisfies estypes.QueryDslBoolQuery;
}

export interface FindFacetParams {
	language: Language;
	term: string;
	filtersValues?: FiltersValues;
}

export function findFacets(
	{
		language,
		term,
		filtersValues,
	}: FindFacetParams,
) {
	const elasticIndex = match(language)
		.with("fr-FR", () => elastic.frFrDocument)
		.with("en-US", () => elastic.enUsDocument)
		.exhaustive();

	const query = match(term)
		.with(
			P.string,
			(term) => buildSimpleSearchQuery({
				language,
				term,
				filtersValues,
			}),
		)
		.exhaustive();

	return elasticIndex.find<FacetResponse>({
		size: 0,
		_source: false,
		query,
		aggregations: buildFacetsAggregations(language),
	});
}
