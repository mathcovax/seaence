import { type buildFilters } from "../facet";
import { type OperatorContent } from "@vendors/types-advanced-query";
import { type estypes } from "@elastic/elasticsearch";
import { buildOperatorContent } from "./build";

interface BuildSimpleSearchQueryParams {
	term: OperatorContent;
	buildedFilters?: ReturnType<typeof buildFilters>;
}

export function buildAdvencedSearchQuery(
	{
		term,
		buildedFilters,
	}: BuildSimpleSearchQueryParams,
) {
	const must = {
		...buildOperatorContent(term),
		__id: "advencedSearchQueryMust",
	} satisfies estypes.QueryDslQueryContainer & { __id: "advencedSearchQueryMust" };

	return {
		__id: "advencedSearchQuery",
		bool: {
			must: [
				must,
				...(
					buildedFilters
						? buildedFilters.must
						: []
				),
			],
		},

	} satisfies estypes.QueryDslQueryContainer & { __id: "advencedSearchQuery" };
}
