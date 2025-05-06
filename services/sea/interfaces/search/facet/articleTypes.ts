import { type ArticleType } from "@interfaces/providers/elastic/common/articleType";
import { type Facet, type AggregationResult } from ".";
import { type estypes } from "@elastic/elasticsearch";

export interface ArticleTypeAggregationsResults {
	articleTypeResult: AggregationResult<ArticleType>;
}

export function buildArticleTypeAggregation() {
	return {
		terms: {
			field: "articleTypes",
			size: 100,
		},
	} satisfies estypes.AggregationsAggregationContainer;
}

export function articleTypeAggregationsResultsToFacet(
	articleTypeResult: ArticleTypeAggregationsResults["articleTypeResult"],
): Facet<ArticleType>[] {
	return articleTypeResult.buckets.map(
		({ key, doc_count }) => ({
			value: key,
			quantity: doc_count,
		}),
	);
}

export interface ArticleTypeFilterValues {
	articleType?: ArticleType[];
}

export function buildArticleTypeFilter(
	articleTypeFilterValues: ArticleTypeFilterValues["articleType"],
) {
	if (articleTypeFilterValues) {
		return [
			{
				terms: {
					articleTypes: articleTypeFilterValues,
				},
			},
		] satisfies estypes.QueryDslQueryContainer[];
	} else {
		return [];
	}
}
