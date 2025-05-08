import { type ArticleType } from "@interfaces/providers/elastic/common/articleType";
import { type Facet, type AggregationResult, type FacetValue } from ".";
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

export type ArticleTypeFacet = Facet<
	"articleType",
	FacetValue<ArticleType>
>;

export function articleTypeAggregationsResultsToFacet(
	articleTypeResult: ArticleTypeAggregationsResults["articleTypeResult"],
): ArticleTypeFacet | null {
	const values = articleTypeResult.buckets.map(
		({ key, doc_count }) => ({
			value: key,
			quantity: doc_count,
		}),
	);

	if (!values.length) {
		return null;
	}

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
				terms: {
					articleTypes: articleTypeFilterValues,
				},
			},
		] satisfies estypes.QueryDslQueryContainer[];
	} else {
		return [];
	}
}
