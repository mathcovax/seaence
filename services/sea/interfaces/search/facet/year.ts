import { type estypes } from "@elastic/elasticsearch";
import { type Facet, type AggregationResult } from ".";

export interface YearAggregationsResults {
	journalPublishYearResult: AggregationResult<number>;
	webPublishYearResult: {
		webPublishYearFilteredResult: AggregationResult<number>;
	};
}

export function buildYearAggregation() {
	return {
		journalPublishYearResult: {
			terms: {
				field: "journalPublishSplitDate.year",
			},
		},
		webPublishYearResult: {
			filter: {
				bool: {
					must_not: {
						exists: {
							field: "journalPublishSplitDate",
						},
					},
				},
			},
			aggregations: {
				webPublishYearFilteredResult: {
					terms: {
						field: "webPublishSplitDate.year",
					},
				},
			} satisfies Record<keyof YearAggregationsResults["webPublishYearResult"], estypes.AggregationsAggregationContainer>,
		},
	} satisfies Record<keyof YearAggregationsResults, estypes.AggregationsAggregationContainer>;
}

export function yearAggregationsResultsToFacet(
	journalPublishYearResult: YearAggregationsResults["journalPublishYearResult"],
	webPublishYearResult: YearAggregationsResults["webPublishYearResult"],
): Facet<number>[] {
	return [
		...journalPublishYearResult.buckets.map(
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
	].toSorted(({ value: valueA }, { value: valueB }) => valueA - valueB);
}
