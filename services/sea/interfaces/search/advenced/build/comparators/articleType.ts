import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorArticleType } from "@vendors/types-advanced-query";
import { formatFieldWithBoost } from "../boost";

export function buildArticleTypeComparator(
	comparatorArticleType: ComparatorArticleType,
): estypes.QueryDslQueryContainer {
	const formatedField = formatFieldWithBoost(
		availableFieldEnum.articleTypes,
		comparatorArticleType.boost,
	);

	return {
		terms: {
			[formatedField]: comparatorArticleType.value,
		},
	};
}
