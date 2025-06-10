import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorArticleType } from "@vendors/types-advanced-query";

export function buildArticleTypeComparator(
	comparatorArticleType: ComparatorArticleType,
): estypes.QueryDslQueryContainer {
	return {
		terms: {
			[availableFieldEnum.articleTypes]: comparatorArticleType.value,
		},
	};
}
