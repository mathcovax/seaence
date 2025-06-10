import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorProvider } from "@vendors/types-advanced-query";

export function buildProviderComparator(
	comparatorProvider: ComparatorProvider,
): estypes.QueryDslQueryContainer {
	return {
		terms: {
			[availableFieldEnum.articleTypes]: comparatorProvider.value,
		},
	};
}
