import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorProvider } from "@vendors/types-advanced-query";
import { formatFieldWithBoost } from "../boost";

export function buildProviderComparator(
	comparatorProvider: ComparatorProvider,
): estypes.QueryDslQueryContainer {
	const formatedField = formatFieldWithBoost(
		availableFieldEnum.providers,
		comparatorProvider.boost,
	);

	return {
		terms: {
			[formatedField]: comparatorProvider.value,
		},
	};
}
