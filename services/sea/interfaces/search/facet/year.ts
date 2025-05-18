import { type estypes } from "@elastic/elasticsearch";
import { type Facet, type AggregationBucketsResult, type FacetValue, type BuildedQuery } from ".";
import { match } from "ts-pattern";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";

export interface YearAggregationsResults {
	journalPublishYearResult: {
		journalPublishYearFilteredResult: AggregationBucketsResult<number>;
	};
	webPublishYearResult: {
		webPublishYearFilteredResult: AggregationBucketsResult<number>;
	};
}

export function buildYearAggregation(query: BuildedQuery) {
	const bool = match(query)
		.returnType<estypes.QueryDslBoolQuery>()
		.with(
			{ __id: "simpleSearchQuery" },
			(query) => ({
				...query.bool,
				must: query.bool.must
					? query.bool.must.filter(
						(value) => value.__id !== "yearFilter",
					)
					: undefined,
			}),
		)
		.with(
			{ __id: "advencedSearchQuery" },
			(query) => ({
				must: [
					...query.bool.must.filter(
						(value) => value.__id !== "yearFilter",
					),
				],
			}),
		)
		.exhaustive();

	return {
		journalPublishYearResult: {
			filter: {
				bool,
			},
			aggregations: {
				journalPublishYearFilteredResult: {
					terms: {
						field: availableFieldEnum["journalPublishSplitDate.year"],
					},
				},
			} satisfies Record<keyof YearAggregationsResults["journalPublishYearResult"], estypes.AggregationsAggregationContainer>,
		},
		webPublishYearResult: {
			filter: {
				bool: {
					must_not: {
						exists: {
							field: availableFieldEnum.journalPublishSplitDate,
						},
					},
					...bool,
				},
			},
			aggregations: {
				webPublishYearFilteredResult: {
					terms: {
						field: availableFieldEnum["webPublishSplitDate.year"],
					},
				},
			} satisfies Record<keyof YearAggregationsResults["webPublishYearResult"], estypes.AggregationsAggregationContainer>,
		},
	} satisfies Record<keyof YearAggregationsResults, estypes.AggregationsAggregationContainer>;
}

export type YearFacet = Facet<
	"year",
	FacetValue<number>
>;

export function yearAggregationsResultsToFacet(
	{
		journalPublishYearResult,
		webPublishYearResult,
	}: YearAggregationsResults,
): YearFacet {
	return {
		name: "year",
		values: [
			...journalPublishYearResult.journalPublishYearFilteredResult.buckets.map(
				({ key, doc_count }) => {
					const webPublishYear = webPublishYearResult.webPublishYearFilteredResult
						.buckets.find(
							({ key: webPublishYearKey }) => webPublishYearKey === key,
						);

					const quantity = webPublishYear
						? doc_count + webPublishYear.doc_count
						: doc_count;

					return {
						value: key,
						quantity,
					};
				},
			),
			...webPublishYearResult.webPublishYearFilteredResult.buckets.flatMap(
				({ key, doc_count }) => {
					const journalPublishYear = journalPublishYearResult
						.journalPublishYearFilteredResult
						.buckets.find(
							({ key: journalPublishKey }) => journalPublishKey === key,
						);

					if (journalPublishYear) {
						return [];
					}

					return {
						value: key,
						quantity: doc_count,
					};
				},
			),
		].toSorted(({ value: valueA }, { value: valueB }) => valueA - valueB),
	};
}

export interface YearFilterValues {
	year?: {
		from: number;
		to: number;
	};
}

export function buildYearFilter(
	yearFilterValues: YearFilterValues["year"],
) {
	if (yearFilterValues) {
		return [
			{
				__id: "yearFilter",
				bool: {
					should: [
						{
							range: {
								[availableFieldEnum["journalPublishSplitDate.year"]]: {
									gte: yearFilterValues.from,
									lte: yearFilterValues.to,
								},
							},
						},
						{
							bool: {
								must_not: {
									exists: {
										field: availableFieldEnum.journalPublishSplitDate,
									},
								},
								must: {
									range: {
										[availableFieldEnum["webPublishSplitDate.year"]]: {
											gte: yearFilterValues.from,
											lte: yearFilterValues.to,
										},
									},
								},
							},
						},
					],
					minimum_should_match: 1,
				},

			},
		] satisfies (estypes.QueryDslQueryContainer & { __id: "yearFilter" })[];
	} else {
		return [];
	}
}
