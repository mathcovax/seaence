import { type estypes } from "@elastic/elasticsearch";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { type GenderAggregationsResults, genderAggregationResultsToFacet, buildGenderAggregation, type GenderFacet, type GenderFilterValues, buildGenderFilter } from "./gender";
import { articleTypeAggregationsResultsToFacet, type ArticleTypeFilterValues, buildArticleTypeAggregation, type ArticleTypeAggregationsResults, buildArticleTypeFilter, type ArticleTypeFacet } from "./articleTypes";
import { buildYearAggregation, yearAggregationsResultsToFacet, type YearFacet, type YearAggregationsResults, type YearFilterValues, buildYearFilter } from "./year";
import { buildSpeciesAggregation, speciesAggregationResultsToFacet, type SpeciesFacet, type SpeciesAggregationsResults, buildSpeciesFilter, type SpeciesFilterValues } from "./species";
import { elastic } from "@interfaces/providers/elastic";
import { match } from "ts-pattern";
import { buildSimpleSearchQuery } from "../simple";
import { removeElasticRequestFields } from "@interfaces/utils/removeElasticRequestFields";
import { type OperatorContent } from "@vendors/types-advanced-query";
import { buildAdvencedSearchQuery } from "../advenced";

interface FacetResponse {
	hits: {
		total: {
			value: number;
		};
	};
	aggregations: AggregationsResults;
}

export interface AggregationBucketsResult<
	GenericKey extends unknown = unknown,
> {
	buckets: {
		key: GenericKey;
		doc_count: number;
	}[];
}

export interface AggregationWrappedBucketsResult<
	GenericBucketsKey extends string = string,
> {
	buckets: Record<GenericBucketsKey, { doc_count: number }>;
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

export type BuildedQuery =
	| ReturnType<typeof buildSimpleSearchQuery>
	| ReturnType<typeof buildAdvencedSearchQuery>;

export type AggregationsResults =
	& GenderAggregationsResults
	& ArticleTypeAggregationsResults
	& SpeciesAggregationsResults
	& {
		globalView:
			& YearAggregationsResults;
	};

export function buildFacetsAggregations(language: Language, query: BuildedQuery) {
	return {
		articleTypeResult: buildArticleTypeAggregation(),
		genderResult: buildGenderAggregation(language),
		globalView: {
			global: {},
			aggregations: {
				...buildYearAggregation(query),
			} satisfies Record<keyof AggregationsResults["globalView"], estypes.AggregationsAggregationContainer>,
		},
		speciesResult: buildSpeciesAggregation(language),
	} satisfies Record<keyof AggregationsResults, estypes.AggregationsAggregationContainer>;
}

export function aggregationsResultsToFacetWrapper(
	language: Language,
	{
		articleTypeResult,
		globalView: {
			journalPublishYearResult,
			webPublishYearResult,
		},
		genderResult,
		speciesResult,
	}: AggregationsResults,
): Facets {
	return [
		yearAggregationsResultsToFacet({
			webPublishYearResult,
			journalPublishYearResult,
		}),
		articleTypeAggregationsResultsToFacet(articleTypeResult),
		genderAggregationResultsToFacet(genderResult),
		speciesAggregationResultsToFacet(speciesResult),
	];
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
	term: string | OperatorContent;
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

	const buildedFilters = filtersValues && buildFilters(language, filtersValues);

	const query = typeof term === "string"
		? buildSimpleSearchQuery({
			term,
			buildedFilters,
		})
		: buildAdvencedSearchQuery({
			term,
			buildedFilters,
		});

	const aggregations = buildFacetsAggregations(language, query);

	removeElasticRequestFields(query);
	removeElasticRequestFields(aggregations);

	return elasticIndex.find<FacetResponse>({
		size: 0,
		_source: false,
		query,
		aggregations,
	});
}
