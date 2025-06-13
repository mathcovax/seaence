import { type ArticleType } from "@interfaces/providers/elastic/common/articleType";
import { type Facet, type AggregationBucketsResult, type FacetValue } from ".";
import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";

export interface ArticleTypeAggregationsResults {
	articleTypeResult: AggregationBucketsResult<ArticleType>;
}

export function buildArticleTypeAggregation() {
	return {
		terms: {
			field: availableFieldEnum.articleTypes,
			size: 100,
		},
	} satisfies estypes.AggregationsAggregationContainer;
}

export type ArticleTypeFacet = Facet<
	"articleType",
	FacetValue<ArticleType>
>;

export function articleTypeAggregationsResultsToFacet(
	articleTypeResult: ArticleTypeAggregationsResults["articleTypeResult"],
): ArticleTypeFacet {
	const values = articleTypeResult.buckets.map(
		({ key, doc_count }) => ({
			value: key,
			quantity: doc_count,
		}),
	);

	return {
		name: "articleType",
		values,
	};
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
				__id: "articleTypeFilter",
				terms: {
					[availableFieldEnum.articleTypes]: articleTypeFilterValues,
				},
			},
		] satisfies (estypes.QueryDslQueryContainer & { __id: "articleTypeFilter" })[];
	} else {
		return [];
	}
}
