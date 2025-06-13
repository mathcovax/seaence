import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorAuthor } from "@vendors/types-advanced-query";
import { formatFieldWithBoost } from "../boost";

export function buildAuthorComparator(
	comparatorAuthor: ComparatorAuthor,
): estypes.QueryDslQueryContainer {
	const formatedField = formatFieldWithBoost(
		availableFieldEnum["authors.strict"],
		comparatorAuthor.boost,
	);

	return {
		match_phrase: {
			[formatedField]: comparatorAuthor.value,
		},
	};
}
