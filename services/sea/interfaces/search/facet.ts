import { type ExpectType } from "@duplojs/utils";
import { type estypes } from "@elastic/elasticsearch";
import { type FacetWrapperSchema } from "@interfaces/http/schemas/facet";
import { type ArticleType } from "@interfaces/providers/elastic/common/articleType";

interface AggregationResult<
	GenericKey extends unknown,
> {
	buckets: {
		key: GenericKey;
		doc_count: number;
	}[];
}

export interface AggregationsResults {
	articleTypeResult: AggregationResult<ArticleType>;
	journalPublishYearResult: AggregationResult<number>;
	webPublishYearResult: {
		webPublishYearfilteredResult: AggregationResult<number>;
	};
}

export const facetsAggregations = {
	articleTypeResult: {
		terms: {
			field: "articleTypes",
		},
	},
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
			webPublishYearfilteredResult: {
				terms: {
					field: "webPublishSplitDate.year",
				},
			},
		},
	},
} satisfies estypes.SearchRequest["aggregations"];

type _ExpectSameKeyof = ExpectType<
	keyof AggregationsResults,
	keyof typeof facetsAggregations,
	"strict"
>;

export function aggregationsResultsToFacetWrapper(
	{
		articleTypeResult,
		journalPublishYearResult,
		webPublishYearResult,
	}: AggregationsResults,
): FacetWrapperSchema {
	return {
		articleType: articleTypeResult.buckets.map(
			({ key, doc_count }) => ({
				value: key,
				quantity: doc_count,
			}),
		),
		year: [
			...journalPublishYearResult.buckets.map(
				({ key, doc_count }) => {
					const webPublishYear = webPublishYearResult.webPublishYearfilteredResult
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
			...webPublishYearResult.webPublishYearfilteredResult.buckets.flatMap(
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
		].toSorted(({ value: valueA }, { value: valueB }) => valueA - valueB),
	};
}
