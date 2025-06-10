import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorAuthor } from "@vendors/types-advanced-query";

export function buildAuthorComparator(
	comparatorAuthor: ComparatorAuthor,
): estypes.QueryDslQueryContainer {
	return {
		match_phrase: {
			[availableFieldEnum["authors.strict"]]: comparatorAuthor.value,
		},
	};
}
